const express = require("express");
const accountController = require("../controllers/AccountController.js");
const accountRoute = express.Router();

accountRoute.get("/getAll", accountController.getAllAccounts);
accountRoute.get("/getAllStudentAccount", accountController.getAllStudentAccount)
accountRoute.get("/getAllTeacherAccount", accountController.getAllTeacherAccount);
accountRoute.get("/getAllAdminAccount", accountController.getAllAdminAccount);

module.exports = accountRoute;