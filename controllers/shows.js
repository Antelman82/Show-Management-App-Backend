const express = require("express");
const router = express.Router();
const Show = require("../models/Show");


// READ Show  test=OK
router.get("/", (req, res) => {
    Show.find().then(shows => res.json(shows));
});

// READ Show  test=OK
router.get("/:_id", (req, res) => {
    console.log(req.params._id)
    const showId = req.params._id;
    Show.find({ _id: showId }).then(show => {
      res.json(show);
    });
});

// CREATE Show  test=OK
router.post('/', (req, res) => 
  {console.log(req.body)
      Show.create(req.body).then(newShow => 
          res.json(newShow)
    );
});

// UPDATE Show  test=OK
router.put('/:id', (req, res) => {
  Show.findByIdAndUpdate(req.params.id, req.body, {new: true})
      .then(updatedShow => res.json(updatedShow))
});
 
// DELETE Show  test=OK
router.delete('/:id', (req, res) => {
  Show.findByIdAndDelete(req.params.id).then(deletedShow => res.json(deletedShow))
});

  
module.exports = router