// user.route.js

const express = require('express');
const userRoutes = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('./DB.js');

// Require User model in our routes module
let User = require('./usermodels/user.model');

// Route to create a user
userRoutes.route('/signup').post(function (req, res) {
  User.findOne({ 'email' : req.body.email }, function(err, user) {
    if (user) {
      res.send({ error: "User already exists." })
    }
    else {
      var hashedPassword = bcrypt.hashSync(req.body.password, 8);
      User.create({
        email: req.body.email,
        username: req.body.username,
        password: hashedPassword
      }, function(err, user) {
        if(err) {
          res.send(err);
        } else {
          console.log("User created.");
          let token = jwt.sign({ id: user._id }, config.secret, { expiresIn: 86400 });
          res.json({
            success: true,
            message: 'Successfully created user!',
            token: token
          });
        }
      });
    }
  });
});

// Route to display users
userRoutes.route('/').get(function (req, res) {
  User.find(function (err, users) {
    if(err) {
      res.json(err);
    } else {
      res.json(users);
    }
  });
});

module.exports = userRoutes;
