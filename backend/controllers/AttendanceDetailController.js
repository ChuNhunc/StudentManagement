const AttendanceDetail = require('../models/AttendanceDetail');
const Attendance = require('../models/Attendance');

const getAllAttendanceDetails = async (req, res) => {
    try {
        const attendanceDetails = await AttendanceDetail.findAll();
        if (!attendanceDetails || attendanceDetails.length === 0) {
        return res.status(404).json({ message: 'Không tìm thấy chi tiết điểm danh nào' });
        }
        res.json(attendanceDetails);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
}

const getAttendanceDetailByAttendanceID = async (req, res) => {
    try {
        const attendanceDetailID = req.params.AttendanceDetailID;
        const attendanceDetail = await AttendanceDetail.findOne({
            where: { AttendanceDetailID: attendanceDetailID },
            include: Attendance,
        });
        if (!attendanceDetail) {
            return res.status(404).json({ message: 'Không tìm thấy chi tiết điểm danh' });
        }
        res.json(attendanceDetail);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
}

const getAllAttendanceDetailByCourseID = async (req, res) => {
    
}

module.exports = {
    getAllAttendanceDetails,
    getAttendanceDetailByAttendanceID,
    getAllAttendanceDetailByCourseID,
};