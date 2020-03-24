const express = require("express");
const router = express.Router();
const Show = require("../models/Show");

router.get("/", (req, res) => {
    Show.find().then(shows => res.json(shows));
});


router.get("/:_id", (req, res) => {
    console.log(req.params._id)
    const showId = req.params._id;
    Show.find({ _id: showId }).then(show => {
      res.json(show);
    });
  });




module.exports = router