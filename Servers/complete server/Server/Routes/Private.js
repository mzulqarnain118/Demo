
const express = require("express");
const routes = express.Router();
// const logger = require('../logger/logger');
const Errors = require('../Errors/Errors');
const mySql = require("../Database/MySql");
const multer = require("../Multer/Multer");

//Authorization routes

// const Auth = require('../../Routes/Auth/Auth');
// Auth.register(routes, mySql, Errors);



module.exports = routes;