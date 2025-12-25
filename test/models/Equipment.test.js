const { expect } = require('chai');
const mongoose = require('mongoose');
const Equipment = require('../../models/Equipment');
const { MongoMemoryServer } = require('mongodb-memory-server');

describe('Equipment Model', () => {
  let mongoServer;

  before(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
  });

  after(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    await Equipment.deleteMany({});
  });

  it('should create equipment with all fields', async () => {
    const equipmentData = {
      name: 'Professional Fireworks Launcher',
      size: 'Large',
      description: 'High-capacity launch system',
      quantity: 5,
      type: 'Launcher'
    };

    const equipment = await Equipment.create(equipmentData);
    expect(equipment).to.have.property('_id');
    expect(equipment.name).to.equal('Professional Fireworks Launcher');
    expect(equipment.quantity).to.equal(5);
  });

  it('should find equipment by id', async () => {
    const equipmentData = {
      name: 'LED Light Array',
      size: 'Medium',
      quantity: 10,
      type: 'Lighting'
    };

    const createdEquipment = await Equipment.create(equipmentData);
    const foundEquipment = await Equipment.findById(createdEquipment._id);

    expect(foundEquipment).to.exist;
    expect(foundEquipment.name).to.equal('LED Light Array');
  });

  it('should update equipment', async () => {
    const equipmentData = {
      name: 'Sound System',
      quantity: 2,
      type: 'Audio'
    };

    const createdEquipment = await Equipment.create(equipmentData);
    const updatedEquipment = await Equipment.findByIdAndUpdate(
      createdEquipment._id,
      { quantity: 3, size: 'Extra Large' },
      { new: true }
    );

    expect(updatedEquipment.quantity).to.equal(3);
    expect(updatedEquipment.size).to.equal('Extra Large');
  });

  it('should delete equipment', async () => {
    const equipmentData = {
      name: 'Old Equipment',
      quantity: 1
    };

    const createdEquipment = await Equipment.create(equipmentData);
    const deletedEquipment = await Equipment.findByIdAndDelete(createdEquipment._id);

    expect(deletedEquipment._id.toString()).to.equal(createdEquipment._id.toString());

    const foundEquipment = await Equipment.findById(createdEquipment._id);
    expect(foundEquipment).to.be.null;
  });

  it('should find all equipment', async () => {
    const items = [
      { name: 'Equipment 1', quantity: 5 },
      { name: 'Equipment 2', quantity: 10 },
      { name: 'Equipment 3', quantity: 15 }
    ];

    await Equipment.create(items);
    const allEquipment = await Equipment.find();

    expect(allEquipment).to.have.lengthOf(3);
  });

  it('should handle numeric quantity field', async () => {
    const equipmentData = {
      name: 'Numbered Equipment',
      quantity: 42
    };

    const equipment = await Equipment.create(equipmentData);
    expect(equipment.quantity).to.equal(42);
    expect(equipment.quantity).to.be.a('number');
  });
});
