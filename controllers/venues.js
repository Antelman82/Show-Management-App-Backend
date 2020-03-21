const express = require("express");
const router = express.Router();
const Venue = require("../models/Venue");

router.get("/", (req, res) => {
    Venue.find().then(venues => res.json(venues));

});

module.exports = router