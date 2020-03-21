const mongoose = require('../db/connection');
const Schema = mongoose.Schema;

const User = new Schema({
  firstName: String,
  lastName: String,
  userName: String,
  password: Number,
  address: String,
  city: String,
  state: String,
  zip: Number,
  phone: Number,
  email: String
});

module.exports = mongoose.model('User', User);
