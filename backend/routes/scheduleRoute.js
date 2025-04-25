const express = require("express");
const scheduleController = require("../controllers/ScheduleController.js");
const scheduleRoute = express.Router();

scheduleRoute.get("/getAll", scheduleController.getAllSchedules);
scheduleRoute.get("/getScheduleInClass/:ClassID", scheduleController.getClassSchedule);
scheduleRoute.post("/setSchedule", scheduleController.setSchedule);
scheduleRoute.put("/updateSchedule/:ScheduleID", scheduleController.updateSchedule);
scheduleRoute.delete("/deleteSchedule/:ScheduleID", scheduleController.deleteSchedule);

module.exports = scheduleRoute;
