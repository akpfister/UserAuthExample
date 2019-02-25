// server.js

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 4000;
const cors = require('cors');
var morgan = require('morgan');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

const userRoute = require('./user.route');

const mongoose = require('mongoose');
const config = require('./DB.js');

mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
);
app.set('secret', config.secret); //secret vraiable

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

app.use('/user', userRoute);

app.listen(PORT, function(){
  console.log('Server is running on Port:',PORT);
});
