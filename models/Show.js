const mongoose = require('../db/connection');
const Schema = mongoose.Schema;

const Show = new Schema({
  businessName: String,
  status: ["Prospect", "Scheduled", "Complete", "Cancelled"],
  date: Date,
  venue: [
    {
        ref: "Venue",
        type: mongoose.Schema.Types.ObjectId
    }  
    ],
  type: [
    {
        ref: "Type",
        type: mongoose.Schema.Types.ObjectId
    }  
    ],
  user: [
      {
      ref: "User",
      type: mongoose.Schema.Types.ObjectId
    }
    ]
});

module.exports = mongoose.model('Show', Show);
