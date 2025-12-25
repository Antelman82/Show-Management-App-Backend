const { expect } = require('chai');
const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const equipmentRouter = require('../../controllers/equipments');
const Equipment = require('../../models/Equipment');
const { MongoMemoryServer } = require('mongodb-memory-server');

describe('Equipment Controller', () => {
  let app;
  let mongoServer;

  before(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);

    app = express();
    app.use(express.json());
    app.use('/equipments', equipmentRouter);
  });

  after(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    await Equipment.deleteMany({});
  });

  describe('GET /equipments', () => {
    it('should return all equipment', async () => {
      const equipment = [
        { name: 'Launcher 1', quantity: 5, type: 'Launcher' },
        { name: 'Light 1', quantity: 10, type: 'Lighting' }
      ];
      await Equipment.create(equipment);

      const res = await request(app).get('/equipments');
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('array').with.lengthOf(2);
    });

    it('should return empty array when no equipment exists', async () => {
      const res = await request(app).get('/equipments');
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('array').that.is.empty;
    });
  });

  describe('GET /equipments/:_id', () => {
    it('should return equipment by id', async () => {
      const equipment = await Equipment.create({
        name: 'Test Equipment',
        quantity: 3,
        type: 'Test'
      });

      const res = await request(app).get(`/equipments/${equipment._id}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('array').with.lengthOf(1);
      expect(res.body[0].name).to.equal('Test Equipment');
    });

    it('should return empty array for non-existent equipment', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app).get(`/equipments/${fakeId}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('array').that.is.empty;
    });
  });

  describe('POST /equipments', () => {
    it('should create new equipment', async () => {
      const newEquipment = {
        name: 'Professional LED Array',
        size: 'Large',
        description: '500W LED array system',
        quantity: 8,
        type: 'Lighting'
      };

      const res = await request(app).post('/equipments').send(newEquipment);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('_id');
      expect(res.body.name).to.equal('Professional LED Array');
      expect(res.body.quantity).to.equal(8);
    });

    it('should create equipment with minimal data', async () => {
      const newEquipment = {
        name: 'Basic Equipment',
        quantity: 1
      };

      const res = await request(app).post('/equipments').send(newEquipment);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('_id');
    });
  });

  describe('PUT /equipments/:id', () => {
    it('should update equipment', async () => {
      const equipment = await Equipment.create({
        name: 'Original Equipment',
        quantity: 2,
        type: 'Original'
      });

      const updateData = {
        quantity: 5,
        size: 'Extra Large'
      };

      const res = await request(app).put(`/equipments/${equipment._id}`).send(updateData);
      expect(res.status).to.equal(200);
      expect(res.body.quantity).to.equal(5);
      expect(res.body.size).to.equal('Extra Large');
    });

    it('should return null for non-existent equipment', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const updateData = { quantity: 10 };

      const res = await request(app).put(`/equipments/${fakeId}`).send(updateData);
      expect(res.status).to.equal(200);
      expect(res.body).to.be.null;
    });
  });

  describe('DELETE /equipments/:id', () => {
    it('should delete equipment', async () => {
      const equipment = await Equipment.create({
        name: 'Equipment to Delete',
        quantity: 1
      });

      const res = await request(app).delete(`/equipments/${equipment._id}`);
      expect(res.status).to.equal(200);
      expect(res.body._id.toString()).to.equal(equipment._id.toString());

      const deletedEquipment = await Equipment.findById(equipment._id);
      expect(deletedEquipment).to.be.null;
    });

    it('should return null for non-existent equipment', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app).delete(`/equipments/${fakeId}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.be.null;
    });
  });
});
