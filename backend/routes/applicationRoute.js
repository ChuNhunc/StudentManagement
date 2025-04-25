const ApplicationController = require('../controllers/ApplicationController.js');
const express = require('express');
const applicationRoute = express.Router();

applicationRoute.get('/getAllApplicationsInClass/:ClassID', ApplicationController.getAllApplicationsInClass);
applicationRoute.post('/createApplication', ApplicationController.createApplication);
applicationRoute.put('/updateApplication/:ApplicationID', ApplicationController.updateApplication);

module.exports = applicationRoute;