const express = require("express");
const router = express.Router();
const Equipment = require("../models/Equipment");

router.get("/", (req, res) => {
    Equipment.find().then(equipments => res.json(equipments));
});

// CREATE Equipment
router.post("/", (req, res) => {
  console.log(req.body)
  Equipment.create(req.body).then(equipment => {
    res.json(equipment);
  });
}); 

// READ Equipment
router.get("/:_id", (req, res) => {
    console.log(req.params._id)
    const equipmentId = req.params._id;
    Equipment.find({ _id: equipmentId }).then(equipment => {
      res.json(equipment);
    });
});

// READ Equipment
router.get("/", (req, res) => {
  Equipment.find().then(equipments => res.json(equipments));
});

// UPDATE Equipment
router.put('/:id', (req, res) => {
  Equipment.findByIdAndUpdate(req.params.id, req.body, {new: true})
      .then(updatedEquipment => res.json(updatedEquipment))
})
 
// DELETE Equipment
router.delete('/:id', (req, res) => {
  Equipment.findByIdAndDelete(req.params.id).then(deletedEquipment => res.json(deletedEquipment))
})
module.exports = router