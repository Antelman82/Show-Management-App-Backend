const express = require("express");
const router = express.Router();
const User = require("../models/User");
// const parser = require("body-parser");



// READ User  test=OK
router.get("/", (req, res) => {
    User.find().then(users => res.json(users));
});

// READ User  test=OK
router.get("/:_id", (req, res) => {
    console.log(req.params._id)
    const userId = req.params._id;
    User.find({ _id: userId }).then(user => {
      res.json(user);
    });
});

// READ User  test=OK
router.get("/:userName", (req, res) => {
    console.log(req.params)
    const userName = req.params.userName;
    User.findOne({ userName: userName }).then(user => {
      res.json(user);
    });
});

// CREATE User  test=OK
router.post('/', (req, res) => 
    {console.log(req.body)
        User.create(req.body).then(newUser => 
            res.json(newUser)
        );
});

// UPDATE User  test=OK
router.put('/:_id', (req, res) => {
    User.findByIdAndUpdate(req.params._id, req.body, {new: true})
      .then(updatedUser => res.json(updatedUser))
})

// DELETE User  test=OK
router.delete('/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id).then(deletedUser => res.json(deletedUser))
 })

 module.exports = router;