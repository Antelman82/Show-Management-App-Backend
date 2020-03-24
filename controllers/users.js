const express = require("express");
const router = express.Router();
const User = require("../models/User");


router.get("/:userName", (req, res) => {
    console.log(req.params)
    const userName = req.params.userName;
    User.findOne({ userName: userName }).then(user => {
      res.json(user);
    });
  });

router.get("/", (req, res) => {
    User.find().then(users => res.json(users));
});




router.post("/", (req, res) => {
    const newUser = req.body;
    User.create(newUser).then(created => {
      res.json(created);
    });
  });

module.exports = router;