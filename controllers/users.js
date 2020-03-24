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


// router.post("/", (req, res) => {
//     const newUser = req.body;
//     User.create(newUser).then(created => {
//       res.json(created);
//     });
//   });

// router.post("/new", (req, res) => {
//     User.create(req.body.user).then(newUser => {
//       Bookmark.create(req.body.bookmark).then(newBookmark => {
//         // push new bookmark id into user.favorites array
//         newUser.favorites.push(newBookmark._id);
//         // push new user id into bookmark.favorited array
//         newBookmark.favorited.push(newUser._id);
  
//         // save both or they wont persist
//         newUser.save();
//         newBookmark.save();
//         // send entire document back
//         res.json(newUser);
//       });
//     });
//   });
  




module.exports = router;