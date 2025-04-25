const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Account = require("../models/Account.js");
const Student = require("../models/Student.js");  
const Teacher = require("../models/Teacher.js");
const sequelize = require("../sequelize.js");
const validator = require("validator");

const secretKey = "abcXz123";

const getNextAccountId = async () => {
  const result = await Account.findOne({
    attributes: [
      [
        sequelize.literal('(SELECT MAX("AccountID") FROM "Accounts")'),
        "maxAccountId",
      ],
    ],
  });
  if (!result) {
    return 1;
  }
  const maxAccountId = result.get("maxAccountId");
  return maxAccountId ? maxAccountId + 1 : 1;
};

const login = async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  console.log(Account);
  try {
    const test =  await bcrypt.hash("a123456", 10)
    console.log("Hashed password:", test);
    const account = await Account.findOne({ where: { Username: username } });
    if (username == "") {
      return res
        .status(400)
        .json({ message: "Tên người dùng không được để trống" });
    }
    if (password == "") {
      return res.status(400).json({ message: "Mật khẩu không được để trống" });
    }
    if (!account) {
      return res
        .status(400)
        .json({ message: "Tên người dùng hoặc mật khẩu không đúng" });
    }
    const isPasswordValid = await bcrypt.compare(password, account.Password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ message: "Tên người dùng hoặc mật khẩu không đúng" });
    }
    const token = jwt.sign({ id: account.AccountID }, secretKey, {
      expiresIn: "1h",
    });
    const role = account.RoleID;
    res.status(200).json({
      message: "Đăng nhập thành công",
      token,
      role,
    });
  } catch (err) {
    console.log(err);
    res.status(600).json({ message: err.message });
  }
};

const logout = async (req, res) => {
  res.json({ message: "Đăng xuất thành công" });
};

const register = async (req, res) => {
  const { username, password, roleid } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const checkAccount = await Account.findOne({
      where: { Username: username },
    });
    if (username == "") {
      return res
        .status(400)
        .json({ message: "Tên người dùng không được để trống" });
    }
    if (password == "") {
      return res.status(400).json({ message: "Mật khẩu không được để trống" });
    }
    if (!validator.isLength(username, { min: 6 })) {
      return res
        .status(400)
        .json({ message: "Tên người dùng phải có ít nhất 6 ký tự" });
    }
    if (!validator.isLength(password, { min: 6 })) {
      return res
        .status(400)
        .json({ message: "Mật khẩu phải có ít nhất 6 ký tự" });
    }
    if (!/[1-9]/.test(password)) {
      return res
        .status(400)
        .json({ message: "Mật khẩu phải chứa ít nhất một số" });
    }
    if (!/[a-zA-z]/.test(password)) {
      return res
        .status(400)
        .json({ message: "Mật khẩu phải chứa ít nhất một chữ cái" });
    }
    if (checkAccount) {
      return res.status(400).json({ message: "Tài khoản đã tồn tại" });
    }
    const account = await Account.create({
      AccountID: await getNextAccountId(),
      Username: username,
      Password: hashedPassword,
      RoleID: roleid,
      // CreatedAt: new Date(),
    });
    console.log(account.Password);
    res.status(200).json({ message: "Tạo tài khoản thành công" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const generateStudentAccount = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    const StudentID = req.body.StudentID;
    const password = String(req.body.FullName + req.body.DateOfBirth);
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed password:", bcrypt.hash("a123456", 10));
    const account = await Account.create({
      AccountID: await getNextAccountId(),
      Username: StudentID,
      Password: hashedPassword,
      RoleID: 1,
      // CreatedAt: new Date(),
    });
    await Student.update(
      { AccountID: account.AccountID },
      { where: { StudentID } }
    );

    res.json({
      message: "Tài khoản đã được tạo thành công",
      AccountID: account.AccountID,
      Username: account.Username,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const accountId = req.accountId;

  try {
    const account = await Account.findByPk(accountId);
    if (!account) {
      return res.status(404).json({ message: "Tài khoản không tồn tại" });
    }

    const isOldPasswordValid = await bcrypt.compare(
      oldPassword,
      account.Password
    );
    if (!isOldPasswordValid) {
      return res.status(400).json({ message: "Mật khẩu cũ không đúng" });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    account.Password = hashedNewPassword;
    await account.save();

    res.status(200).json({ message: "Đổi mật khẩu thành công" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
}

const generateTeacherAccount = async (req, res) => {
  try {
    const TeacherID = req.body.TeacherID;
    const password = String(req.body.FullName);
    const hashedPassword = await bcrypt.hash(password, 10);
    const account = await Account.create({
      AccountID: await getNextAccountId(),
      Username: TeacherID,
      Password: hashedPassword,
      RoleID: 2,
      // CreatedAt: new Date(),
    });
    await Teacher.update(
      { AccountID: account.AccountID },
      { where: { TeacherID } }
    );

    res.json({
      message: "Tài khoản đã được tạo thành công",
      AccountID: account.AccountID,
      Username: account.Username,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
}

module.exports = { login, logout, register, generateStudentAccount, generateTeacherAccount };
