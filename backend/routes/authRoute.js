const express = require("express");
const authController = require("../controllers/authController.js");

const authRoute = express.Router();

authRoute.post("/login", authController.login);
authRoute.post("/logout", authController.logout);
authRoute.post("/register", authController.register);
authRoute.post(
  "/generateStudentAccount",
  authController.generateStudentAccount
);
authRoute.post(
  "/generateTeacherAccount",
  authController.generateTeacherAccount
);

module.exports = authRoute;
