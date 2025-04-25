const Courses = require('../models/Course.js');

const getAllCourses = async (req, res) => {
    try {
        const courses = await Courses.findAll();
        if(!courses || courses.length === 0) {
            return res.status(404).json({ message: "Không tìm thấy khóa học nào" });
        }
        res.json(courses);
    } catch (err) {
        console.error(err); // Ghi log lỗi để kiểm tra
        res.status(500).json({ message: err.message || "Đã xảy ra lỗi không xác định" });
    }
}

const getCourseById = async (req, res) => {
    try {
        const course = await Courses.findOne({
            where: { CourseID: req.params}
        });
        res.json(course);
    }catch(err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = { getAllCourses, getCourseById };