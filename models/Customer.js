const mongoose = require('../db/connection');
const Schema = mongoose.Schema;

const Customer = new Schema({
  customerName: String,
  customerEmail: String,
  customerPhone: Number,
  customerComment: String,
});

module.exports = mongoose.model('Customer', Customer);
