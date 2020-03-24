const express = require("express");
const router = express.Router();
const Equipment = require("../models/Equipment");

router.get("/", (req, res) => {
    Equipment.find().then(equipments => res.json(equipments));
});

router.get("/:_id", (req, res) => {
    console.log(req.params._id)
    const equipmentId = req.params._id;
    Equipment.find({ _id: equipmentId }).then(equipment => {
      res.json(equipment);
    });
  });

module.exports = router