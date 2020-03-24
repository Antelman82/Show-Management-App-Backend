const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

router.get("/", (req, res) => {
    Product.find().then(products => res.json(products));
});

router.get("/:_id", (req, res) => {
    console.log(req.params._id)
    const productId = req.params._id;
    Product.find({ _id: productId }).then(product => {
      res.json(product);
    });
  });


module.exports = router