const mongoose = require('../db/connection');
const Schema = mongoose.Schema;

const Show = new Schema({
  Name: String,
  Status: ["Prospect", "Scheduled", "Complete", "Cancelled"],
  Venue: [
    {
        ref: "Venue",
        type: mongoose.Schema.Types.ObjectsID
    }  
  ],
  date: Date,
  types: [
    {
        ref: "Type",
        type: mongoose.Schema.Types.ObjectsID
    }  
  ],
  users: [
      {
      ref: "User",
      type: mongoose.Schema.Types.ObjectsID
    }
    ]
});

module.exports = mongoose.model('Show', Show);
