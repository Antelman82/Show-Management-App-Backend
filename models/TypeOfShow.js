const mongoose = require('../db/connection');
const Schema = mongoose.Schema;

const TypeOfShow = new Schema({
  typeOfShow: String,
  typePic1Link: String,
  typePic2Link: String,
  typeDescription: String,
});

module.exports = mongoose.model('TypeOfShow', TypeOfShow);
