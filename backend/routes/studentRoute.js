const express = require("express");
const studentController = require("../controllers/StudentController.js");

const studentRoute = express.Router();

studentRoute.get("/getAllStudent", studentController.getAllStudents);
studentRoute.get(
  "/getStudentByID/:StudentID",
  studentController.getStudentByID
);
studentRoute.post("/createStudent", studentController.createStudent);
studentRoute.get(
  "/getStudentByName/:StudentName",
  studentController.getStudentByName
);
studentRoute.put(
  "/updateStudent/:StudentID",
  studentController.updateStudent
);
studentRoute.delete(
  "/deleteStudent/:StudentID",
  studentController.deleteStudent
);



module.exports = studentRoute;
