const Lesson = require('../models/Lesson.js');
const Course = require('../models/Course.js');

const getAllLesson = async (req, res) => {
    try {
        const lesson = await Lesson.findAll();
        if (!lesson || lesson.length === 0) {
            return res.status(404).json({ message: "Không tìm thấy bài học nào" });
        }
        res.json(lesson);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}

const getAllLessonsInCourse = async (req, res) => {
    try {
        const lesson = await Lesson.findAll({
            where: { CourseID: req.params.CourseID },
        });
        return res.json(lesson);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}

module.exports = { getAllLessonsInCourse , getAllLesson};