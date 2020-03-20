const mongoose = require('../db/connection');
const Schema = mongoose.Schema;

const Customer = new Schema({
  customerName: String,
  customerFirstName: String,
  customerLastName: String,
  customerEmail: String,
  customerPhone: Number,
  customerComment: String,
});

module.exports = mongoose.model('Customer', Customer);
