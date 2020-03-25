const express = require("express");
const router = express.Router();
const User = require("../models/User");
// const parser = require("body-parser");




router.get("/", (req, res) => {
    User.find().then(users => res.json(users));
});

router.get("/:_id", (req, res) => {
    console.log(req.params._id)
    const userId = req.params._id;
    User.find({ _id: userId }).then(user => {
      res.json(user);
    });
});

router.get("/:userName", (req, res) => {
    console.log(req.params)
    const userName = req.params.userName;
    User.findOne({ userName: userName }).then(user => {
      res.json(user);
    });
});

router.post("/", (req, res) => {
    // const newUser = req.body;
    User.create(req.body).then(newUser => {
      res.json(newUser);
      console.log(newUser);
    });
});

router.put('/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, {new: true})
      .then(updatedUser => res.json(updatedUser))
 })

router.delete('/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id).then(deletedUser => res.json(deletedUser))
 })

 module.exports = router;