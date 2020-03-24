const express = require("express");
const router = express.Router();

const Customer = require("../models/Customer");

router.get("/", (req, res) => {
    Customer.find().then(customers => res.json(customers));

});

router.get("/:_id", (req, res) => {
    console.log(req.params._id)
    const customerId = req.params._id;
    Customer.find({ _id: customerId }).then(customer => {
      res.json(customer);
    });
  });

module.exports = router