const mongoose = require('../db/connection');
const Schema = mongoose.Schema;

const Type = new Schema({
  show: ["Fireworks", "Pyrotechnics", "Complete"],
  description: String,
  pictures: []
});

module.exports = mongoose.model('Type', Type);
