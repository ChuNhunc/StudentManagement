const express = require("express");
const attendanceController = require("../controllers/AttendanceController.js");

const attendanceRoute = express.Router();

attendanceRoute.get(
  "/getAllStudentInClass/:ClassID",
  attendanceController.getAllStudentInClass
);
attendanceRoute.post(
  "/addStudentToClass",
  attendanceController.AddStudentToClass
);
attendanceRoute.delete(
  "/deleteStudentFromClass",
  attendanceController.deleteStudentFromClass
);
attendanceRoute.get(
  "/getAllClassByStudentID/:studentID",
  attendanceController.getAllClassesByStudentID
);
attendanceRoute.get(
  "/getAllClassByTeacherID/:teacherID",
  attendanceController.getAllClassesByTeacherID
);
module.exports = attendanceRoute;
