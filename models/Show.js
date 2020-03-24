const mongoose = require('../db/connection');
const Schema = mongoose.Schema;

const Show = new Schema({
  businessName: String,
  status: [],
  date: Date,
  venue: String,
  type: String,
  user: [],
  role: []
});

module.exports = mongoose.model('Show', Show);
