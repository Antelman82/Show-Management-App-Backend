const mongoose = require('../db/connection');
const Schema = mongoose.Schema;

const Equipment = new Schema({
    name: String,
    size: String,
    description: String,
    quantity: Number,
    type: String
});

module.exports = mongoose.model('Equipment', Equipment);
