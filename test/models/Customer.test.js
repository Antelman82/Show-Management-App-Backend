const { expect } = require('chai');
const mongoose = require('mongoose');
const Customer = require('../../models/Customer');
const { MongoMemoryServer } = require('mongodb-memory-server');

describe('Customer Model', () => {
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
    await Customer.deleteMany({});
  });

  it('should create a customer with all fields', async () => {
    const customerData = {
      businessName: 'Acme Corp',
      firstName: 'John',
      lastName: 'Smith',
      phone: '555-0100',
      email: 'john@acme.com',
      comment: ['Great service', 'Recommended']
    };

    const customer = await Customer.create(customerData);
    expect(customer).to.have.property('_id');
    expect(customer.businessName).to.equal('Acme Corp');
    expect(customer.comment).to.have.lengthOf(2);
  });

  it('should find a customer by id', async () => {
    const customerData = {
      businessName: 'Tech Solutions',
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane@tech.com'
    };

    const createdCustomer = await Customer.create(customerData);
    const foundCustomer = await Customer.findById(createdCustomer._id);

    expect(foundCustomer).to.exist;
    expect(foundCustomer.firstName).to.equal('Jane');
  });

  it('should update a customer', async () => {
    const customerData = {
      businessName: 'Original Name',
      firstName: 'Bob',
      email: 'bob@example.com'
    };

    const createdCustomer = await Customer.create(customerData);
    const updatedCustomer = await Customer.findByIdAndUpdate(
      createdCustomer._id,
      { businessName: 'Updated Name', phone: '555-1234' },
      { new: true }
    );

    expect(updatedCustomer.businessName).to.equal('Updated Name');
    expect(updatedCustomer.phone).to.equal('555-1234');
  });

  it('should delete a customer', async () => {
    const customerData = {
      businessName: 'Delete Me Corp',
      firstName: 'Alice'
    };

    const createdCustomer = await Customer.create(customerData);
    const deletedCustomer = await Customer.findByIdAndDelete(createdCustomer._id);

    expect(deletedCustomer._id.toString()).to.equal(createdCustomer._id.toString());

    const foundCustomer = await Customer.findById(createdCustomer._id);
    expect(foundCustomer).to.be.null;
  });

  it('should find all customers', async () => {
    const customers = [
      { businessName: 'Company A', firstName: 'Person A' },
      { businessName: 'Company B', firstName: 'Person B' },
      { businessName: 'Company C', firstName: 'Person C' }
    ];

    await Customer.create(customers);
    const allCustomers = await Customer.find();

    expect(allCustomers).to.have.lengthOf(3);
  });

  it('should handle empty comments array', async () => {
    const customerData = {
      businessName: 'No Comments Corp',
      firstName: 'Silent',
      comment: []
    };

    const customer = await Customer.create(customerData);
    expect(customer.comment).to.be.an('array').that.is.empty;
  });
});
