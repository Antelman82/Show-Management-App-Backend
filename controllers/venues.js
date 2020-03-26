const express = require("express");
const router = express.Router();
const Venue = require("../models/Venue");

// CREATE Venue  test=OK
router.get("/", (req, res) => {
    Venue.find().then(venues => res.json(venues));
});

// CREATE Venue  test=OK
router.get("/:_id", (req, res) => {
    console.log(req.params._id)
    const venueId = req.params._id;
    Venue.find({ _id: venueId }).then(venue => {
      res.json(venue);
    });
});

// CREATE Venue  test=OK
router.post('/', (req, res) => 
  {console.log(req.body)
    Venue.create(req.body).then(newVenue => 
          res.json(newVenue)
    );
});

// UPDATE Venue  test=OK
router.put('/:id', (req, res) => {
  Venue.findByIdAndUpdate(req.params.id, req.body, {new: true})
      .then(updatedVenue => res.json(updatedVenue))
});
 
// DELETE Venue  test=OK
router.delete('/:id', (req, res) => {
  Venue.findByIdAndDelete(req.params.id).then(deletedVenue => res.json(deletedVenue))
});


module.exports = router