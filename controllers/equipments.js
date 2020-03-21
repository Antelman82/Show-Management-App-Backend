const express = require("express");
const router = express.Router();
const Equipment = require("../models/Equipment");

router.get("/", (req, res) => {
    Equipment.find().then(equipments => res.json(equipments));
});

module.exports = router