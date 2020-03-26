const mongoose = require('../db/connection');
const Schema = mongoose.Schema;

const Customer = new Schema({
  businessName: String,
  firstName: String,
  lastName: String,
  phone: String,
  email: String,
  comment: []
});

module.exports = mongoose.model('Customer', Customer);
