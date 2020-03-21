const mongoose = require('../db/connection');
const Schema = mongoose.Schema;

const User = new Schema({
  firstName: String,
  lastName: String,
  userName: String,
  password: String,
  address: String,
  city: String,
  state: String,
  zip: Number,
  phone: String,
  email: String
});

module.exports = mongoose.model('User', User);
