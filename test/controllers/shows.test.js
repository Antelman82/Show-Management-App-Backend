const { expect } = require('chai');
const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const showRouter = require('../../controllers/shows');
const Show = require('../../models/Show');
const { MongoMemoryServer } = require('mongodb-memory-server');

describe('Show Controller', () => {
  let app;
  let mongoServer;

  before(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);

    app = express();
    app.use(express.json());
    app.use('/shows', showRouter);
  });

  after(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    await Show.deleteMany({});
  });

  describe('GET /shows', () => {
    it('should return all shows', async () => {
      const shows = [
        { businessName: 'Show 1', date: '2025-06-01' },
        { businessName: 'Show 2', date: '2025-07-01' }
      ];
      await Show.create(shows);

      const res = await request(app).get('/shows');
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('array').with.lengthOf(2);
    });

    it('should return empty array when no shows exist', async () => {
      const res = await request(app).get('/shows');
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('array').that.is.empty;
    });
  });

  describe('GET /shows/:_id', () => {
    it('should return a show by id', async () => {
      const show = await Show.create({
        businessName: 'Test Show',
        date: '2025-08-15'
      });

      const res = await request(app).get(`/shows/${show._id}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('array').with.lengthOf(1);
      expect(res.body[0].businessName).to.equal('Test Show');
    });

    it('should return empty array for non-existent show', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app).get(`/shows/${fakeId}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('array').that.is.empty;
    });
  });

  describe('POST /shows', () => {
    it('should create a new show', async () => {
      const newShow = {
        businessName: 'New Year Spectacular',
        status: 'scheduled',
        date: '2026-01-01',
        venue: 'Central Park',
        type: 'Fireworks'
      };

      const res = await request(app).post('/shows').send(newShow);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('_id');
      expect(res.body.businessName).to.equal('New Year Spectacular');
    });

    it('should create show with array fields', async () => {
      const newShow = {
        businessName: 'Multi-user Show',
        user: ['user1', 'user2'],
        role: ['manager', 'technician']
      };

      const res = await request(app).post('/shows').send(newShow);
      expect(res.status).to.equal(200);
      expect(res.body.user).to.have.lengthOf(2);
      expect(res.body.role).to.have.lengthOf(2);
    });
  });

  describe('PUT /shows/:id', () => {
    it('should update a show', async () => {
      const show = await Show.create({
        businessName: 'Original Show',
        status: 'planning',
        date: '2025-07-04'
      });

      const updateData = {
        status: 'confirmed',
        venue: 'Downtown Park'
      };

      const res = await request(app).put(`/shows/${show._id}`).send(updateData);
      expect(res.status).to.equal(200);
      expect(res.body.status).to.equal('confirmed');
      expect(res.body.venue).to.equal('Downtown Park');
    });

    it('should return null for non-existent show', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const updateData = { status: 'completed' };

      const res = await request(app).put(`/shows/${fakeId}`).send(updateData);
      expect(res.status).to.equal(200);
      expect(res.body).to.be.null;
    });
  });

  describe('DELETE /shows/:id', () => {
    it('should delete a show', async () => {
      const show = await Show.create({
        businessName: 'Show to Delete',
        date: '2025-12-25'
      });

      const res = await request(app).delete(`/shows/${show._id}`);
      expect(res.status).to.equal(200);
      expect(res.body._id.toString()).to.equal(show._id.toString());

      const deletedShow = await Show.findById(show._id);
      expect(deletedShow).to.be.null;
    });

    it('should return null for non-existent show', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app).delete(`/shows/${fakeId}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.be.null;
    });
  });
});
