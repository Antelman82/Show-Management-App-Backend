const express = require("express");
const router = express.Router();
const Type = require("../models/Type");

router.get("/", (req, res) => {
    Type.find().then(types => res.json(types));
});

router.get("/:_id", (req, res) => {
    console.log(req.params._id)
    const typeId = req.params._id;
    Type.find({ _id: typeId }).then(type => {
      res.json(type);
    });
});

// CREATE Type
router.post('/', (req, res) => {
    console.log(req.body)
    Type.create(req.body).then(newType => 
        res.json(newType)
    );
});

// UPDATE Type
router.put('/:id', (req, res) => {
  Type.findByIdAndUpdate(req.params.id, req.body, {new: true})
      .then(updatedType => res.json(updatedType))
});

// DELETE Type
router.delete('/:id', (req, res) => {
  Type.findByIdAndDelete(req.params.id).then(deletedType => res.json(deletedType))
});

module.exports = router