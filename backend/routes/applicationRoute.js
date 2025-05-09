const ApplicationController = require('../controllers/ApplicationController.js');
const express = require('express');
const applicationRoute = express.Router();

applicationRoute.get('/getAllApplicationsInClass/:ClassID', ApplicationController.getAllApplicationsInClass);
applicationRoute.post('/createApplication', ApplicationController.createApplication);
applicationRoute.put('/updateApplication/:ApplicationID', ApplicationController.updateApplication);
applicationRoute.get('/getApplicationInClassByStudentID/:ClassID/:StudentID', ApplicationController.getApplicationInClassByStudentID)
applicationRoute.get('/getAllStudentApplication/:StudentID', ApplicationController.getAllStudentApplication);
applicationRoute.get('/getApplicationByID/:ApplicationID', ApplicationController.getApplicationByID);
applicationRoute.get('/getAllApplicationByClassID/:ClassID', ApplicationController.getAllApplicationByClassID);

module.exports = applicationRoute;