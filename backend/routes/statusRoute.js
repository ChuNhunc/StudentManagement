const StatusController = require('../controllers/StatusController.js');
const express = require('express');
const statusRoute = express.Router();

statusRoute.get('/getAll', StatusController.getAllStatus);

module.exports = statusRoute;
