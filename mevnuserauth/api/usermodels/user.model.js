// user.model.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for User
let User = new Schema({
  email: String,
  username: String,
  password: String
},{
  collection: 'users'
});

module.exports = mongoose.model('User', User);
