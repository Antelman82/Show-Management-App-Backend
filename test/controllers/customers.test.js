const { expect } = require('chai');
const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const customerRouter = require('../../controllers/customers');
const Customer = require('../../models/Customer');
const { MongoMemoryServer } = require('mongodb-memory-server');

describe('Customer Controller', () => {
  let app;
  let mongoServer;

  before(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);

    app = express();
    app.use(express.json());
    app.use('/customers', customerRouter);
  });

  after(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    await Customer.deleteMany({});
  });

  describe('GET /customers', () => {
    it('should return all customers', async () => {
      const customers = [
        { businessName: 'Acme Corp', firstName: 'John', email: 'john@acme.com' },
        { businessName: 'Tech Inc', firstName: 'Jane', email: 'jane@tech.com' }
      ];
      await Customer.create(customers);

      const res = await request(app).get('/customers');
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('array').with.lengthOf(2);
    });

    it('should return empty array when no customers exist', async () => {
      const res = await request(app).get('/customers');
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('array').that.is.empty;
    });
  });

  describe('GET /customers/:_id', () => {
    it('should return a customer by id', async () => {
      const customer = await Customer.create({
        businessName: 'Test Corp',
        firstName: 'Bob',
        email: 'bob@test.com'
      });

      const res = await request(app).get(`/customers/${customer._id}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('array').with.lengthOf(1);
      expect(res.body[0].businessName).to.equal('Test Corp');
    });

    it('should return empty array for non-existent customer', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app).get(`/customers/${fakeId}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('array').that.is.empty;
    });
  });

  describe('POST /customers', () => {
    it('should create a new customer', async () => {
      const newCustomer = {
        businessName: 'New Business LLC',
        firstName: 'Alice',
        lastName: 'Smith',
        phone: '555-0123',
        email: 'alice@newbiz.com',
        comment: ['Good service', 'Would recommend']
      };

      const res = await request(app).post('/customers').send(newCustomer);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('_id');
      expect(res.body.businessName).to.equal('New Business LLC');
      expect(res.body.comment).to.have.lengthOf(2);
    });

    it('should create customer with minimal data', async () => {
      const newCustomer = {
        businessName: 'Minimal Inc',
        firstName: 'Charlie'
      };

      const res = await request(app).post('/customers').send(newCustomer);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('_id');
    });
  });

  describe('PUT /customers/:id', () => {
    it('should update a customer', async () => {
      const customer = await Customer.create({
        businessName: 'Original Co',
        firstName: 'Dave',
        email: 'dave@old.com'
      });

      const updateData = {
        businessName: 'Updated Co',
        phone: '555-9999'
      };

      const res = await request(app).put(`/customers/${customer._id}`).send(updateData);
      expect(res.status).to.equal(200);
      expect(res.body.businessName).to.equal('Updated Co');
      expect(res.body.phone).to.equal('555-9999');
    });

    it('should return null for non-existent customer', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const updateData = { businessName: 'Updated' };

      const res = await request(app).put(`/customers/${fakeId}`).send(updateData);
      expect(res.status).to.equal(200);
      expect(res.body).to.be.null;
    });
  });

  describe('DELETE /customers/:id', () => {
    it('should delete a customer', async () => {
      const customer = await Customer.create({
        businessName: 'Delete Me Inc',
        firstName: 'Eve'
      });

      const res = await request(app).delete(`/customers/${customer._id}`);
      expect(res.status).to.equal(200);
      expect(res.body._id.toString()).to.equal(customer._id.toString());

      const deletedCustomer = await Customer.findById(customer._id);
      expect(deletedCustomer).to.be.null;
    });

    it('should return null for non-existent customer', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app).delete(`/customers/${fakeId}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.be.null;
    });
  });
});
