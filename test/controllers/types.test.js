const { expect } = require('chai');
const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const typeRouter = require('../../controllers/types');
const Type = require('../../models/Type');
const { MongoMemoryServer } = require('mongodb-memory-server');

describe('Type Controller', () => {
  let app;
  let mongoServer;

  before(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);

    app = express();
    app.use(express.json());
    app.use('/types', typeRouter);
  });

  after(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    await Type.deleteMany({});
  });

  describe('GET /types', () => {
    it('should return all types', async () => {
      const types = [
        { type: 'Fireworks', description: 'Firework shows' },
        { type: 'Pyrotechnics', description: 'Pyrotechnic displays' }
      ];
      await Type.create(types);

      const res = await request(app).get('/types');
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('array').with.lengthOf(2);
    });

    it('should return empty array when no types exist', async () => {
      const res = await request(app).get('/types');
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('array').that.is.empty;
    });
  });

  describe('GET /types/:_id', () => {
    it('should return a type by id', async () => {
      const type = await Type.create({
        type: 'Test Type',
        description: 'Test description'
      });

      const res = await request(app).get(`/types/${type._id}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('array').with.lengthOf(1);
      expect(res.body[0].type).to.equal('Test Type');
    });

    it('should return empty array for non-existent type', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app).get(`/types/${fakeId}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('array').that.is.empty;
    });
  });

  describe('POST /types', () => {
    it('should create a new type', async () => {
      const newType = {
        type: 'Special Effects',
        description: 'Special effects displays',
        pictures: ['pic1.jpg', 'pic2.jpg']
      };

      const res = await request(app).post('/types').send(newType);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('_id');
      expect(res.body.type).to.equal('Special Effects');
      expect(res.body.pictures).to.have.lengthOf(2);
    });

    it('should create type with minimal data', async () => {
      const newType = {
        type: 'Minimal Type'
      };

      const res = await request(app).post('/types').send(newType);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('_id');
    });
  });

  describe('PUT /types/:id', () => {
    it('should update a type', async () => {
      const type = await Type.create({
        type: 'Original Type',
        description: 'Original description'
      });

      const updateData = {
        description: 'Updated description',
        pictures: ['new.jpg']
      };

      const res = await request(app).put(`/types/${type._id}`).send(updateData);
      expect(res.status).to.equal(200);
      expect(res.body.description).to.equal('Updated description');
      expect(res.body.pictures).to.include('new.jpg');
    });

    it('should return null for non-existent type', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const updateData = { type: 'Updated Type' };

      const res = await request(app).put(`/types/${fakeId}`).send(updateData);
      expect(res.status).to.equal(200);
      expect(res.body).to.be.null;
    });
  });

  describe('DELETE /types/:id', () => {
    it('should delete a type', async () => {
      const type = await Type.create({
        type: 'Type to Delete',
        description: 'Will be deleted'
      });

      const res = await request(app).delete(`/types/${type._id}`);
      expect(res.status).to.equal(200);
      expect(res.body._id.toString()).to.equal(type._id.toString());

      const deletedType = await Type.findById(type._id);
      expect(deletedType).to.be.null;
    });

    it('should return null for non-existent type', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app).delete(`/types/${fakeId}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.be.null;
    });
  });
});
