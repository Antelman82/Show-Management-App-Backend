const express = require("express");
const router = express.Router();
const Product = require("../models/Product");


// CREATE Product  test=OK
router.post("/", (req, res) => {
  console.log(req.body);
  Product.create(req.body).then(product => {
    res.json(product);
  });
}); 

// READ Product  test=OK
router.get("/:_id", (req, res) => {
  console.log(req.params._id);
  const productId = req.params._id;
  Product.find({ _id: productId }).then(product => {
    res.json(product);
  });
});

// READ Product  test=OK
router.get("/", (req, res) => {
  Product.find().then(products => res.json(products));
});

// UPDATE Product  test=OK
router.put('/:id', (req, res) => {
  Product.findByIdAndUpdate(req.params.id, req.body, {new: true})
      .then(updatedProduct => res.json(updatedProduct))
});
 
// DELETE Show  test=OK
router.delete('/:id', (req, res) => {
  Product.findByIdAndDelete(req.params.id).then(deletedProduct => res.json(deletedProduct))
});

module.exports = router