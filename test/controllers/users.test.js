const { expect } = require('chai');
const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('../../controllers/users');
const User = require('../../models/User');
const { MongoMemoryServer } = require('mongodb-memory-server');

describe('User Controller', () => {
  let app;
  let mongoServer;

  before(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);

    app = express();
    app.use(express.json());
    app.use('/users', userRouter);
  });

  after(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe('GET /users', () => {
    it('should return all users', async () => {
      const users = [
        { firstName: 'John', userName: 'john', email: 'john@test.com' },
        { firstName: 'Jane', userName: 'jane', email: 'jane@test.com' }
      ];
      await User.create(users);

      const res = await request(app).get('/users');
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('array').with.lengthOf(2);
    });

    it('should return empty array when no users exist', async () => {
      const res = await request(app).get('/users');
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('array').that.is.empty;
    });
  });

  describe('GET /users/:_id', () => {
    it('should return a user by id', async () => {
      const user = await User.create({
        firstName: 'Bob',
        userName: 'bob',
        email: 'bob@test.com'
      });

      const res = await request(app).get(`/users/${user._id}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('array').with.lengthOf(1);
      expect(res.body[0].firstName).to.equal('Bob');
    });

    it('should return empty array for non-existent user', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app).get(`/users/${fakeId}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('array').that.is.empty;
    });
  });

  describe('GET /users/username/:userName', () => {
    it('should return a user by username', async () => {
      await User.create({
        firstName: 'Alice',
        userName: 'alice',
        email: 'alice@test.com'
      });

      const res = await request(app).get('/users/username/alice');
      expect(res.status).to.equal(200);
      expect(res.body.userName).to.equal('alice');
      expect(res.body.firstName).to.equal('Alice');
    });

    it('should return null for non-existent username', async () => {
      const res = await request(app).get('/users/username/nonexistent');
      expect(res.status).to.equal(200);
      expect(res.body).to.be.null;
    });
  });

  describe('POST /users', () => {
    it('should create a new user', async () => {
      const newUser = {
        firstName: 'Charlie',
        lastName: 'Brown',
        userName: 'charlie',
        password: 'pass123',
        email: 'charlie@test.com'
      };

      const res = await request(app).post('/users').send(newUser);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('_id');
      expect(res.body.userName).to.equal('charlie');

      const savedUser = await User.findById(res.body._id);
      expect(savedUser).to.exist;
    });

    it('should create user with partial data', async () => {
      const newUser = {
        firstName: 'Dave',
        userName: 'dave'
      };

      const res = await request(app).post('/users').send(newUser);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('_id');
      expect(res.body.firstName).to.equal('Dave');
    });
  });

  describe('PUT /users/:_id', () => {
    it('should update a user', async () => {
      const user = await User.create({
        firstName: 'Eve',
        userName: 'eve',
        email: 'eve@old.com'
      });

      const updateData = {
        email: 'eve@new.com',
        city: 'New York'
      };

      const res = await request(app).put(`/users/${user._id}`).send(updateData);
      expect(res.status).to.equal(200);
      expect(res.body.email).to.equal('eve@new.com');
      expect(res.body.city).to.equal('New York');
    });

    it('should return null for non-existent user', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const updateData = { firstName: 'Frank' };

      const res = await request(app).put(`/users/${fakeId}`).send(updateData);
      expect(res.status).to.equal(200);
      expect(res.body).to.be.null;
    });
  });

  describe('DELETE /users/:id', () => {
    it('should delete a user', async () => {
      const user = await User.create({
        firstName: 'Grace',
        userName: 'grace',
        email: 'grace@test.com'
      });

      const res = await request(app).delete(`/users/${user._id}`);
      expect(res.status).to.equal(200);
      expect(res.body._id.toString()).to.equal(user._id.toString());

      const deletedUser = await User.findById(user._id);
      expect(deletedUser).to.be.null;
    });

    it('should return null for non-existent user', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app).delete(`/users/${fakeId}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.be.null;
    });
  });
});
