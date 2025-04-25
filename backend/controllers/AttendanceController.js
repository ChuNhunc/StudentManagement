const Attendance = require("../models/Attendance.js");
const Class = require("../models/Classes.js");
const Student = require("../models/Student.js");

const getAllStudentInClass = async (req, res) => {
  try {
    const classID = req.params.ClassID;
    const students = await Attendance.findAll({
      where: { ClassID: classID },
    });
    if (!students || students.length === 0) {
      return res
        .status(404)
        .json({ message: "Không có học sinh nào trong lớp" });
    }
    res.json(students);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

const generateAttendanceID = async (classID, studentID) => {
  const attendanceID = `${classID}_${studentID}_${timestamp}`;

  return attendanceID;
};
const AddStudentToClass = async (req, res) => {
  try {
    const { ClassID, StudentID } = req.body;
    const attendanceID = await generateAttendanceID(ClassID, StudentID);
    const newAttendance = await Attendance.create({
      AttendanceID: attendanceID,
      ClassID: ClassID,
      StudentID: StudentID,
    });
    res.json(newAttendance);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

const deleteStudentFromClass = async (req, res) => {
  const {studentId, ClassId} = req.body;
  try {
    const student = await Attendance.findOne({
      where: { StudentID: studentId, ClassID: ClassId },
    });
    if (!student) {
      return res.status(404).json({ message: "Không tìm thấy học sinh" });
    }
    await Attendance.destroy({
      where: { StudentID: studentId, ClassID: ClassId },
    });
    res.json({ message: "Học sinh đã được xóa khỏi lớp" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
}

const getAllClassesByStudentID = async (req, res) => {
  const studentID = req.params.studentID;
  try {
    const attendance = await Attendance.findAll({
      where: { StudentID: studentID },
    });
    if (!attendance || attendance.length === 0) {
      return res.status(404).json({ message: "Hiện chưa tham gia lớp nào" });
    }
    res.json(attendance);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

const getAllClassesByTeacherID = async (req, res) => {
  const teacherID = req.params.teacherID;
  try {
    const classes = await Class.findAll({
      where: { TeacherID: teacherID },
    });
    if (!classes || classes.length === 0) {
      return res.status(404).json({ message: "Không có lớp nào" });
    }
    res.json(classes);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
}

module.exports = { getAllStudentInClass, AddStudentToClass, deleteStudentFromClass, getAllClassesByStudentID, getAllClassesByTeacherID };
