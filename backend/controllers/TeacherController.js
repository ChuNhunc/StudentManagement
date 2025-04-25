const Teacher = require('../models/Teacher.js');

const getAllTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.findAll();
        if (!teachers || teachers.length === 0) {
        return res.status(404).json({ message: 'Không có giáo viên nào' });
        }
        res.json(teachers);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
}

const getTeacherByID = async (req, res) => {
    try {
        const teacherID = req.params.TeacherID;
        const teacher = await Teacher.findOne({
            where: { TeacherID: teacherID },
        });
        if (!teacher) {
            return res.status(404).json({ message: 'Không tìm thấy giáo viên' });
        }
        res.json(teacher);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
}

const getTeacherByName = async (req, res) => {
    try {
        const { name } = req.query;
        const teachers = await Teacher.findAll({
            where: { FullName: name },
        });
        if (!teachers || teachers.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy giáo viên' });
        }
        res.json(teachers);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
}

const GenerateTeacherID = async () => {
    const datetime = new Date();
    const year = String(datetime.getFullYear()).slice(-2); // Năm
    const month = String(datetime.getMonth() + 1).padStart(2, "0");
    const date = String(datetime.getDate()).padStart(2, "0");
    const hours = String(datetime.getHours()).padStart(2, "0");
    const minutes = String(datetime.getMinutes()).padStart(2, "0");
    const seconds = String(datetime.getSeconds()).padStart(2, "0");
  
    // Ghép các thành phần thành chuỗi
    const timestamp = `${year}${month}${date}${hours}${minutes}${seconds}`;
  
    const TeacherID = `T_${timestamp}`;
    return TeacherID;
  };

const createTeacher = async (req, res) => {
    try {
        const {FullName, Email, PhoneNumber, Introduction } = req.body;
        const TeacherID = await GenerateTeacherID();
        const newTeacher = await Teacher.create({
            TeacherID: TeacherID,
            FullName,
            Email,
            PhoneNumber,
            Introduction
        });
        res.status(201).json(newTeacher);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
}

const updateTeacher = async (req, res) => {
    try {
        const teacherID = req.params.TeacherID;
        const { FullName, Email, PhoneNumber, Introduction} = req.body;
        const teacher = await Teacher.findOne({
            where: { TeacherID: teacherID },
        });
        if (!teacher) {
            return res.status(404).json({ message: 'Không tìm thấy giáo viên' });
        }
        teacher.FullName = FullName;
        teacher.Email = Email;
        teacher.PhoneNumber = PhoneNumber;
        teacher.Introduction = Introduction;
        await teacher.save();
        res.json(teacher);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
}

const deleteTeacher = async (req, res) => {
    try {
        const teacherID = req.params.TeacherID;
        const teacher = await Teacher.findOne({
            where: { TeacherID: teacherID },
        });
        if (!teacher) {
            return res.status(404).json({ message: 'Không tìm thấy giáo viên' });
        }
        await teacher.destroy();
        res.json({ message: 'Xóa giáo viên thành công' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
}


module.exports = {
    getAllTeachers,
    getTeacherByID,
    getTeacherByName,
    createTeacher,
    updateTeacher,
    deleteTeacher,
};