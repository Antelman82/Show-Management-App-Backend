const express = require("express");
const router = express.Router();
const Show = require("../models/Show");

router.get("/", (req, res) => {
    Show.find().then(shows => res.json(shows));
});

module.exports = router