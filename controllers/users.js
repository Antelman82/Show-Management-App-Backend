const express = require("express");
const router = express.Router();
const User = require("../models/User");



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
    const newUser = req.body;
    User.create(newUser).then(created => {
      res.json(created);
    });
  });

module.exports = router;