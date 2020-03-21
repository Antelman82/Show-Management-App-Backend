const express = require("express");
const router = express.Router();
const Customer = require("../models/Customer");

router.get("/", (req, res) => {
    Customer.find().then(customers => res.json(customers));

});

module.exports = router