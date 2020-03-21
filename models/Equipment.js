const mongoose = require('../db/connection');
const Schema = mongoose.Schema;

const Equipment = new Schema({
    name: String,
    description: String,
    size: String,
    quantity: Number,
    type: ["Fireworks", "Pyrotechnics", "Special Effects"]
});

module.exports = mongoose.model('Equipment', Equipment);
