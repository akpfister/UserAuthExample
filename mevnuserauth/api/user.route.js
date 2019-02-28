// user.route.js

const express = require('express');
const userRoutes = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('./DB.js');

let cookie_domain = 'localhost';

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
          // let token = jwt.sign({ id: user._id }, config.secret, { expiresIn: 86400 });
          res.send({
            success: true,
            message: 'Successfully created user!',
            token: null
          });
        }
      });
    }
  });
});

// Route to login a user
userRoutes.route('/login').post(function (req, res) {
  User.findOne({ 'username' : req.body.username }, function (err, user) {
    if(err) {
      res.status(500).send({
        error: err,
        message: 'Backend Server Error.'
      });
    } else if(!user) {
      res.send({ message: 'User not found' });
    } else {
      bcrypt.compare(req.body.password, user.password).then(function(validPassword) {
        if(!validPassword) {
          res.status(400).send({ auth: false, error: 'Incorrect password.', token: null })
        } else {
          var token = jwt.sign({ id: user._id }, config.secret, { expiresIn: 86400 });
          res.cookie('csrf_token', token, { maxAge: 86400000, httpOnly: true, domain: cookie_domain })
          .status(200)
          .send({
            success: true,
            message: 'Successfully logged in user!',
            token: token
          });
        }
      }).catch((err) => {
        console.log("Error comparing passwords.");
        console.log(err);
        res.status(500).send({ auth: false, error: 'Backend Server Error.', token: null })
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

// Route to user profile
userRoutes.route('/profile').get(function (req, res) {
  var header_token = req.headers['x-access-token']
  var cookie_token = req.cookies['csrf_token']

  if (!header_token || !cookie_token) {
    return res.status(403).send({ auth: false, message: 'No token.' });
  } else if (header_token != cookie_token) {
    return res.status(403).send({ auth: false, message: 'Tokens do not match.' });
  }
  jwt.verify(cookie_token, config.secret, function(err, decoded) {
    if (err) {
      return res.status(403).send({ auth: false, message: 'Failed to authenticate token.' })
    }
    var userId = decoded.id
    User.findById(userId, function (err, user) {
      if(err) {
        res.send(err);
      } else {
        res.send(user);
      }
    });
  });
});


module.exports = userRoutes;
