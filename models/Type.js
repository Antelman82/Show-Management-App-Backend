const mongoose = require('../db/connection');
const Schema = mongoose.Schema;

const Type = new Schema({
  type: String,
  description: String,
  pictures: []
});

module.exports = mongoose.model('Type', Type);
