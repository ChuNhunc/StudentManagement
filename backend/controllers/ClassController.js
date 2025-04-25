const Class = require("../models/Classes.js");
const Student = require("../models/Student.js");
const getAllClasses = async (req, res) => {
  try {
    const classes = await Class.findAll();
    if (!classes || classes.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy lớp nào" });
    }
    res.json(classes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createClass = async (req, res) => {
  try {
    const newClass = await Class.create({
      ClassID: req.body.ClassID,
      CourseID: req.body.CourseID,
      ClassName: req.body.ClassName,
      StartDate: req.body.StartDate,
      EndDate: req.body.EndDate,
      StudentNumber: req.body.StudentNumber,
      TeacherID: req.body.TeacherID,
    });
    res.json(newClass);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getClassByID = async (req, res) => {
  try {
    const classID = req.params.ClassID;
    const classInfo = await Class.findOne({
      where: { ClassID: classID },
      include: Student,
    });
    if (!classInfo) {
      return res.status(404).json({ message: "Không tìm thấy lớp học" });
    }
    res.json(classInfo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

const getClassByCourseID = async (req, res) => {
  try {
    const courseID = req.params.CourseID;
    const classInfo = await Class.findAll({
      where: { CourseID: courseID },
      include: Student,
    });
    if (!classInfo || classInfo.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy lớp học" });
    }
    res.json(classInfo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

const getClassByClassName = async (req, res) => {
  try {
    const className = req.params.ClassName;
    const classInfo = await Class.findAll({
      where: { ClassName: className },
      include: Student,
    });
    if (!classInfo || classInfo.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy lớp học" });
    }
    res.json(classInfo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

const updateClass = async (req, res) => {
  try {
    const classID = req.params.ClassID;
    const updatedClass = await Class.update(req.body, {
      where: { ClassID: classID },
    });
    if (!updatedClass) {
      return res.status(404).json({ message: "Không tìm thấy lớp học" });
    }
    res.json(updatedClass);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

const deleteClass = async (req, res) => {
  try {
    const classID = req.params.ClassID;
    const deletedClass = await Class.destroy({
      where: { ClassID: classID },
    });
    if (!deletedClass) {
      return res.status(404).json({ message: "Không tìm thấy lớp học" });
    }
    res.json({ message: "Lớp học đã được xóa thành công" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}


const getAllClassesByTeacherID = async (req, res) => {
  try {
    const teacherID = req.params.TeacherID;
    const classes = await Class.findAll({
      where: { TeacherID: teacherID },
    });
    if (!classes || classes.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy lớp nào" });
    }
    res.json(classes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}


module.exports = { getAllClasses, createClass, getClassByID, getClassByCourseID, getClassByClassName, updateClass, deleteClass, getAllClassesByTeacherID };
