const express = require("express");
const attendanceDetailController = require("../controllers/AttendanceDetailController.js");
const attendanceDetailRoute = express.Router();


attendanceDetailRoute.get(
  "/getAllAttendanceDetails",
    attendanceDetailController.getAllAttendanceDetails
);

module.exports = attendanceDetailRoute;