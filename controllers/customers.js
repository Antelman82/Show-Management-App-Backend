const express = require("express");
const router = express.Router();

const Customer = require("../models/Customer");

// READ Customer  test=OK
router.get("/", (req, res) => {
    Customer.find().then(customers => 
      res.json(customers));
});

// READ Customer  test=OK
router.get("/:_id", (req, res) => {
    console.log(req.params._id)
    const customerId = req.params._id;
    Customer.find({ _id: customerId }).then(customer => {
      res.json(customer);
  });
});

// CREATE Customer  test=OK
router.post('/', (req, res) => 
  {console.log(req.body)
      Customer.create(req.body).then(newCustomer => 
          res.json(newCustomer)
    );
});

// UPDATE Customer  test=OK
router.put('/:id', (req, res) => {
  Customer.findByIdAndUpdate(req.params.id, req.body, {new: true})
      .then(updatedCustomer => res.json(updatedCustomer))
});
 
// DELETE Customer  test=OK
router.delete('/:id', (req, res) => {
  Customer.findByIdAndDelete(req.params.id).then(deletedCustomer => res.json(deletedCustomer))
});

module.exports = router