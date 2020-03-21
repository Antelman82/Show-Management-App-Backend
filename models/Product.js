const mongoose = require('../db/connection');
const Schema = mongoose.Schema;

const Product = new Schema({
    name: String,
    size: String,
    description: String,
    quantity: Number,
    type: [
        {
            ref: "Type",
            type: mongoose.Schema.Types.ObjectId
        }  
      ]
});

module.exports = mongoose.model('Product', Product);