const express = require("express");
const teacherController = require('../controllers/TeacherController.js');
const teacherRoute = express.Router();

teacherRoute.get("/getAll", teacherController.getAllTeachers);
teacherRoute.get("/getTeacherByID/:TeacherID", teacherController.getTeacherByID);
teacherRoute.get("/getTeacherByName/", teacherController.getTeacherByName);
teacherRoute.post("/createTeacher", teacherController.createTeacher);
teacherRoute.put("/updateTeacher/:TeacherID", teacherController.updateTeacher);
teacherRoute.delete("/deleteTeacher/:TeacherID", teacherController.deleteTeacher);

module.exports = teacherRoute;