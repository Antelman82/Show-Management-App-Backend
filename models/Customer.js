const mongoose = require('../db/connection');
const Schema = mongoose.Schema;

const Customer = new Schema({
  businessName: String,
  contacts: [{
    firstName: String,
    lastName: String,
    email: String,
    phone: Number
  }],
  
  comment: []
});

module.exports = mongoose.model('Customer', Customer);
