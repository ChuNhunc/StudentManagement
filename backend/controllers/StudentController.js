const Student = require("../models/Student.js");

const getAllStudents = async (req, res) => {
  try {
    const students = await Student.findAll();
    if (!students || students.length === 0) {
      return res.status(404).json({ message: "Không có học sinh nào" });
    }
    res.json(students);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

const getStudentByID = async (req, res) => {
  try {
    const studentID = req.params.StudentID;
    const student = await Student.findOne({
      where: { StudentID: studentID },
    });
    if (!student) {
      return res.status(404).json({ message: "Không tìm thấy học sinh" });
    }
    res.json(student);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

const getStudentByName = async (req, res) => {
  try {
    const studentName = req.params.StudentName;
    const students = await Student.findAll({
      where: { StudentName: studentName },
    });
    if (!students || students.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy học sinh" });
    }
    res.json(students);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

const createStudent = async (req, res) => {
  try {
    const {StudentID, AccountID, FullName, DateOfBirth, Email, PhoneNumber, Address } =
      req.body;
    const newStudent = await Student.create({
      StudentID: StudentID,
      AccountID: AccountID,
      FullName: FullName,
      DateOfBirth: DateOfBirth,
      Email: Email,
      PhoneNumber: PhoneNumber,
      Address: Address,
    });
    res.json(newStudent);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

const updateStudent = async (req, res) => {
  try {
    const studentID = req.params.StudentID;
    const student = await Student.findOne({
      where: { StudentID: studentID },
    });
    if (!student) {
      return res.status(404).json({ message: "Không tìm thấy học sinh" });
    }
    await student.update(req.body);
    res.json(student);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
}

const deleteStudent = async (req, res) => {
  try {
    const studentID = req.params.StudentID;
    const student = await Student.findOne({
      where: { StudentID: studentID },
    });
    if (!student) {
      return res.status(404).json({ message: "Không tìm thấy học sinh" });
    }
    await student.destroy();
    res.json({ message: "Xóa học sinh thành công" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  getAllStudents,
  getStudentByID,
  getStudentByName,
  createStudent,
  updateStudent,
  deleteStudent,
};
