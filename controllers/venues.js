const express = require("express");
const router = express.Router();
const Venue = require("../models/Venue");

router.get("/", (req, res) => {
    Venue.find().then(venues => res.json(venues));
});

router.get("/:_id", (req, res) => {
    console.log(req.params._id)
    const venueId = req.params._id;
    Venue.find({ _id: venueId }).then(venue => {
      res.json(venue);
    });
  });




module.exports = router