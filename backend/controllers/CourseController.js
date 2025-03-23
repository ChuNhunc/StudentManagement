const getAllCourse = async (req, res) => {
    try {
        const courses = await Course.findAll();
        res.json(courses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getCourse = async (req, res) => {
    try {
        const course = await Course.findOne({
            where: { CourseID: req.params}
        });
        res.json(course);
    }catch(err) {
        res.status(500).json({ message: err.message });
    }
}