const express = require("express");
const lessonController = require("../controllers/LessonController.js");
const lessonRoute = express.Router();

lessonRoute.get("/getAll", lessonController.getAllLesson);
lessonRoute.get("/getLessonInCourse/:CourseID", lessonController.getAllLessonsInCourse);

module.exports = lessonRoute;