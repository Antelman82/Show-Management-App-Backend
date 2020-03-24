const express = require("express");
const router = express.Router();
const Type = require("../models/Type");

router.get("/", (req, res) => {
    Type.find().then(types => res.json(types));
});

router.get("/:_id", (req, res) => {
    console.log(req.params._id)
    const typeId = req.params._id;
    Type.find({ _id: typeId }).then(type => {
      res.json(type);
    });
  });


module.exports = router