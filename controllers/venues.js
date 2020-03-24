const express = require("express");
const router = express.Router();
const Venue = require("../models/Venue");

router.get("/", (req, res) => {
    Venue.find().then(venues => res.json(venues));
});

router.get("/:venue_Id", (req, res) => {
    console.log(req.params)
    const venue_Id = req.params.venue_Id;
    Venue.findOne({ venue_Id: venue_Id }).then(venue => {
      res.json(venue);
    });
  });




module.exports = router