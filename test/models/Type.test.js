const { expect } = require('chai');
const mongoose = require('mongoose');
const Type = require('../../models/Type');
const { MongoMemoryServer } = require('mongodb-memory-server');

describe('Type Model', () => {
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
    await Type.deleteMany({});
  });

  it('should create a type with all fields', async () => {
    const typeData = {
      type: 'Fireworks',
      description: 'Firework display shows',
      pictures: ['pic1.jpg', 'pic2.jpg']
    };

    const type = await Type.create(typeData);
    expect(type).to.have.property('_id');
    expect(type.type).to.equal('Fireworks');
    expect(type.pictures).to.have.lengthOf(2);
  });

  it('should find a type by id', async () => {
    const typeData = {
      type: 'Pyrotechnics',
      description: 'Pyrotechnic shows'
    };

    const createdType = await Type.create(typeData);
    const foundType = await Type.findById(createdType._id);

    expect(foundType).to.exist;
    expect(foundType.type).to.equal('Pyrotechnics');
  });

  it('should update a type', async () => {
    const typeData = {
      type: 'Special Effects',
      description: 'Original description'
    };

    const createdType = await Type.create(typeData);
    const updatedType = await Type.findByIdAndUpdate(
      createdType._id,
      { description: 'Updated description', pictures: ['new.jpg'] },
      { new: true }
    );

    expect(updatedType.description).to.equal('Updated description');
    expect(updatedType.pictures).to.include('new.jpg');
  });

  it('should delete a type', async () => {
    const typeData = {
      type: 'Deletable Type',
      description: 'Will be deleted'
    };

    const createdType = await Type.create(typeData);
    const deletedType = await Type.findByIdAndDelete(createdType._id);

    expect(deletedType._id.toString()).to.equal(createdType._id.toString());

    const foundType = await Type.findById(createdType._id);
    expect(foundType).to.be.null;
  });

  it('should find all types', async () => {
    const types = [
      { type: 'Type 1', description: 'Description 1' },
      { type: 'Type 2', description: 'Description 2' },
      { type: 'Type 3', description: 'Description 3' }
    ];

    await Type.create(types);
    const allTypes = await Type.find();

    expect(allTypes).to.have.lengthOf(3);
  });

  it('should handle pictures array field', async () => {
    const typeData = {
      type: 'Multi-Picture Type',
      pictures: ['pic1.jpg', 'pic2.jpg', 'pic3.jpg']
    };

    const type = await Type.create(typeData);
    expect(type.pictures).to.be.an('array').with.lengthOf(3);
  });
});
