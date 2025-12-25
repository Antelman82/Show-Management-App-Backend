const { expect } = require('chai');
const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const productRouter = require('../../controllers/products');
const Product = require('../../models/Product');
const { MongoMemoryServer } = require('mongodb-memory-server');

describe('Product Controller', () => {
  let app;
  let mongoServer;

  before(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);

    app = express();
    app.use(express.json());
    app.use('/products', productRouter);
  });

  after(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    await Product.deleteMany({});
  });

  describe('GET /products', () => {
    it('should return all products', async () => {
      const products = [
        { name: 'Product 1', quantity: 10, type: 'Type 1' },
        { name: 'Product 2', quantity: 20, type: 'Type 2' }
      ];
      await Product.create(products);

      const res = await request(app).get('/products');
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('array').with.lengthOf(2);
    });

    it('should return empty array when no products exist', async () => {
      const res = await request(app).get('/products');
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('array').that.is.empty;
    });
  });

  describe('GET /products/:_id', () => {
    it('should return a product by id', async () => {
      const product = await Product.create({
        name: 'Test Product',
        quantity: 5
      });

      const res = await request(app).get(`/products/${product._id}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('array').with.lengthOf(1);
      expect(res.body[0].name).to.equal('Test Product');
    });

    it('should return empty array for non-existent product', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app).get(`/products/${fakeId}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('array').that.is.empty;
    });
  });

  describe('POST /products', () => {
    it('should create a new product', async () => {
      const newProduct = {
        name: 'Premium Fireworks Shell',
        size: 'Large',
        description: '3-inch shell with colorful burst',
        quantity: 100,
        type: 'Shell'
      };

      const res = await request(app).post('/products').send(newProduct);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('_id');
      expect(res.body.name).to.equal('Premium Fireworks Shell');
      expect(res.body.quantity).to.equal(100);
    });

    it('should create product with minimal data', async () => {
      const newProduct = {
        name: 'Minimal Product'
      };

      const res = await request(app).post('/products').send(newProduct);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('_id');
    });
  });

  describe('PUT /products/:id', () => {
    it('should update a product', async () => {
      const product = await Product.create({
        name: 'Original Product',
        quantity: 10
      });

      const updateData = {
        quantity: 50,
        size: 'Extra Large'
      };

      const res = await request(app).put(`/products/${product._id}`).send(updateData);
      expect(res.status).to.equal(200);
      expect(res.body.quantity).to.equal(50);
      expect(res.body.size).to.equal('Extra Large');
    });

    it('should return null for non-existent product', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const updateData = { quantity: 100 };

      const res = await request(app).put(`/products/${fakeId}`).send(updateData);
      expect(res.status).to.equal(200);
      expect(res.body).to.be.null;
    });
  });

  describe('DELETE /products/:id', () => {
    it('should delete a product', async () => {
      const product = await Product.create({
        name: 'Product to Delete',
        quantity: 5
      });

      const res = await request(app).delete(`/products/${product._id}`);
      expect(res.status).to.equal(200);
      expect(res.body._id.toString()).to.equal(product._id.toString());

      const deletedProduct = await Product.findById(product._id);
      expect(deletedProduct).to.be.null;
    });

    it('should return null for non-existent product', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app).delete(`/products/${fakeId}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.be.null;
    });
  });
});
