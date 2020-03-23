const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/", (req, res) => {
    User.find().then(users => res.json(users));
});

router.get("/:user.userName", (req, res) => {
    const userName = req.params.user.userName;
    User.findOne({ userName: user.userName }).then(user => {
      res.json(user);
    });
  });ß


router.post("/", (req, res) => {
    const newUser = req.body;
    User.create(newUser).then(created => {
      res.json(created);
    });
  });

module.exports = router;