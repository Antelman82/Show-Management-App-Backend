const { expect } = require('chai');
const mongoose = require('mongoose');
const Product = require('../../models/Product');
const { MongoMemoryServer } = require('mongodb-memory-server');

describe('Product Model', () => {
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
    await Product.deleteMany({});
  });

  it('should create a product with all fields', async () => {
    const productData = {
      name: 'Premium Fireworks Shell',
      size: 'Large',
      description: '3-inch shell with colorful burst',
      quantity: 100,
      type: 'Shell'
    };

    const product = await Product.create(productData);
    expect(product).to.have.property('_id');
    expect(product.name).to.equal('Premium Fireworks Shell');
    expect(product.quantity).to.equal(100);
  });

  it('should find a product by id', async () => {
    const productData = {
      name: 'Sparklers',
      size: 'Small',
      quantity: 500
    };

    const createdProduct = await Product.create(productData);
    const foundProduct = await Product.findById(createdProduct._id);

    expect(foundProduct).to.exist;
    expect(foundProduct.name).to.equal('Sparklers');
  });

  it('should update a product', async () => {
    const productData = {
      name: 'Fountain',
      quantity: 50,
      type: 'Fountain'
    };

    const createdProduct = await Product.create(productData);
    const updatedProduct = await Product.findByIdAndUpdate(
      createdProduct._id,
      { quantity: 75, size: 'Extra Large' },
      { new: true }
    );

    expect(updatedProduct.quantity).to.equal(75);
    expect(updatedProduct.size).to.equal('Extra Large');
  });

  it('should delete a product', async () => {
    const productData = {
      name: 'Roman Candle',
      quantity: 25
    };

    const createdProduct = await Product.create(productData);
    const deletedProduct = await Product.findByIdAndDelete(createdProduct._id);

    expect(deletedProduct._id.toString()).to.equal(createdProduct._id.toString());

    const foundProduct = await Product.findById(createdProduct._id);
    expect(foundProduct).to.be.null;
  });

  it('should find all products', async () => {
    const products = [
      { name: 'Product 1', quantity: 10 },
      { name: 'Product 2', quantity: 20 },
      { name: 'Product 3', quantity: 30 }
    ];

    await Product.create(products);
    const allProducts = await Product.find();

    expect(allProducts).to.have.lengthOf(3);
  });

  it('should allow products without type field', async () => {
    const productData = {
      name: 'Generic Product',
      quantity: 5
    };

    const product = await Product.create(productData);
    expect(product).to.have.property('_id');
    expect(product.type).to.be.undefined;
  });
});
