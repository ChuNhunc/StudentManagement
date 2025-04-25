const Schedule = require("../models/Schedule.js");
const Course = require("../models/Course.js");

const getAllSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.findAll();
    if (!schedules || schedules.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy lịch học nào" });
    }
    res.json(schedules);
  } catch (err) {
    console.log(err); 
    res
      .status(500)
      .json({ message: err.message || "Đã xảy ra lỗi không xác định" });
  }
};

const getClassSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.findAll({
      where: { ClassID: req.params.ClassID },
      include: Course,
    });
    if (!schedule || schedule.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy lịch học nào" });
    }
    res.json(schedule);
  } catch (err) {
    console.error(err); // Ghi log lỗi để kiểm tra
    res
      .status(500)
      .json({ message: err.message || "Đã xảy ra lỗi không xác định" });
  }
};

const setSchedule = async (req, res) => {
  try {
    const {ScheduleID, ClassID, LessonID, StartTime, EndTime, Room,Notes } = req.body;
    const schedule = await Schedule.create({
      ScheduleID,
      ClassID,
      LessonID,
      StartTime,
      EndTime,
      Room,
      Notes
    });
    res.status(201).json(schedule);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: err.message || "Đã xảy ra lỗi không xác định" });
  }
};

const updateSchedule = async (req, res) => {
  try {
    const scheduleID = req.params.ScheduleID;
    const {ScheduleID, ClassID, LessonID, StartTime, EndTime, Room,Notes } = req.body;
    const schedule = await Schedule.update(
      { ScheduleID, ClassID, LessonID, StartTime, EndTime, Room,Notes },
      { where: { ScheduleID: scheduleID } }
    );
    if (!schedule) {
      return res.status(404).json({ message: "Không tìm thấy lịch học nào" });
    }
    res.json(schedule);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: err.message || "Đã xảy ra lỗi không xác định" });
  }
}

const deleteSchedule = async (req, res) => {
  try {
    const scheduleID = req.params.ScheduleID;
    const schedule = await Schedule.destroy({
      where: { ScheduleID: scheduleID },
    });
    if (!schedule) {
      return res.status(404).json({ message: "Không tìm thấy lịch học nào" });
    }
    res.json({ message: "Xóa lịch học thành công" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: err.message || "Đã xảy ra lỗi không xác định" });
  }
}

module.exports = { getAllSchedules, getClassSchedule, setSchedule, updateSchedule, deleteSchedule };
