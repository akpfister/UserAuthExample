// user.route.js

const express = require('express');
const userRoutes = express.Router();

// Require User model in our routes module
let User = require('./usermodels/user.model');
