const { expect } = require('chai');
const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const venueRouter = require('../../controllers/venues');
const Venue = require('../../models/Venue');
const { MongoMemoryServer } = require('mongodb-memory-server');

describe('Venue Controller', () => {
  let app;
  let mongoServer;

  before(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);

    app = express();
    app.use(express.json());
    app.use('/venues', venueRouter);
  });

  after(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    await Venue.deleteMany({});
  });

  describe('GET /venues', () => {
    it('should return all venues', async () => {
      const venues = [
        { venue: 'Central Park', city: 'New York', state: 'NY' },
        { venue: 'Downtown Park', city: 'Springfield', state: 'IL' }
      ];
      await Venue.create(venues);

      const res = await request(app).get('/venues');
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('array').with.lengthOf(2);
    });

    it('should return empty array when no venues exist', async () => {
      const res = await request(app).get('/venues');
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('array').that.is.empty;
    });
  });

  describe('GET /venues/:_id', () => {
    it('should return a venue by id', async () => {
      const venue = await Venue.create({
        venue: 'Test Venue',
        city: 'Test City',
        state: 'TC'
      });

      const res = await request(app).get(`/venues/${venue._id}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('array').with.lengthOf(1);
      expect(res.body[0].venue).to.equal('Test Venue');
    });

    it('should return empty array for non-existent venue', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app).get(`/venues/${fakeId}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('array').that.is.empty;
    });
  });

  describe('POST /venues', () => {
    it('should create a new venue', async () => {
      const newVenue = {
        venue: 'Grand Stadium',
        address: '123 Sports Lane',
        city: 'Boston',
        state: 'MA',
        country: 'USA',
        zip: '02101'
      };

      const res = await request(app).post('/venues').send(newVenue);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('_id');
      expect(res.body.venue).to.equal('Grand Stadium');
      expect(res.body.city).to.equal('Boston');
    });

    it('should create venue with minimal data', async () => {
      const newVenue = {
        venue: 'Minimal Venue',
        city: 'Some City'
      };

      const res = await request(app).post('/venues').send(newVenue);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('_id');
    });
  });

  describe('PUT /venues/:id', () => {
    it('should update a venue', async () => {
      const venue = await Venue.create({
        venue: 'Original Venue',
        city: 'Original City',
        state: 'OC'
      });

      const updateData = {
        venue: 'Updated Venue',
        address: '999 New Street'
      };

      const res = await request(app).put(`/venues/${venue._id}`).send(updateData);
      expect(res.status).to.equal(200);
      expect(res.body.venue).to.equal('Updated Venue');
      expect(res.body.address).to.equal('999 New Street');
    });

    it('should return null for non-existent venue', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const updateData = { venue: 'Updated Venue' };

      const res = await request(app).put(`/venues/${fakeId}`).send(updateData);
      expect(res.status).to.equal(200);
      expect(res.body).to.be.null;
    });
  });

  describe('DELETE /venues/:id', () => {
    it('should delete a venue', async () => {
      const venue = await Venue.create({
        venue: 'Venue to Delete',
        city: 'Temporary City'
      });

      const res = await request(app).delete(`/venues/${venue._id}`);
      expect(res.status).to.equal(200);
      expect(res.body._id.toString()).to.equal(venue._id.toString());

      const deletedVenue = await Venue.findById(venue._id);
      expect(deletedVenue).to.be.null;
    });

    it('should return null for non-existent venue', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app).delete(`/venues/${fakeId}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.be.null;
    });
  });
});
