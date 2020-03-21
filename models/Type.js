const mongoose = require('../db/connection');
const Schema = mongoose.Schema;

const Type = new Schema({
  Show: String,
  Pictures: [],
  Description: String
});

module.exports = mongoose.model('Type', Type);
