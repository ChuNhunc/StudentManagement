const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Account = require("../models/Account.js");
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
  const maxAccountId = result.get("maxAccountId");
  return maxAccountId ? maxAccountId + 1 : 1;
};

const login = async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  console.log(Account);
  try {
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

module.exports = { login, logout, register };
