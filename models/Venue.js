const mongoose = require('../db/connection');
const Schema = mongoose.Schema;

const Venue = new Schema({
    businessName: String,
    venue: String,
    address: String,
    city: String,
    state: String,
    zip: Number
});

module.exports = mongoose.model('Venue', Venue);
