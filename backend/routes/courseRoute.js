const express = require("express");
const courseController = require("../controllers/CourseController.js");

const courseRoute = express.Router();

courseRoute.get("/getAll", courseController.getAllCourses);
courseRoute.get("/get/:id", courseController.getCourseById);

module.exports = courseRoute
