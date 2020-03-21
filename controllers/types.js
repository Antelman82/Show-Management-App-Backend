const express = require("express");
const router = express.Router();
const Type = require("../models/Type");

router.get("/", (req, res) => {
    Type.find().then(types => res.json(types));
});

module.exports = router