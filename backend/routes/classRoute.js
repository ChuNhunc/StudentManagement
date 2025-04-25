const express = require("express");
const classController = require("../controllers/ClassController.js");

const classRoute = express.Router();

classRoute.post("/create", classController.createClass);
classRoute.get("/getAll", classController.getAllClasses);
classRoute.get("/getClassByID/:ClassID", classController.getClassByID);
classRoute.get("/getClassByName/:ClassName", classController.getClassByClassName);
classRoute.put("/updateClass/:ClassID", classController.updateClass);
classRoute.delete("/deleteClass/:ClassID", classController.deleteClass);
classRoute.get("/getClassByCourseID/:CourseID", classController.getClassByCourseID);
classRoute.get("/getClassByTeacherID/:TeacherID", classController.getAllClassesByTeacherID);

module.exports = classRoute;
