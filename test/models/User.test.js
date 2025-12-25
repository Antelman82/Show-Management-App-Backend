const { expect } = require('chai');
const mongoose = require('mongoose');
const User = require('../../models/User');
const { MongoMemoryServer } = require('mongodb-memory-server');

describe('User Model', () => {
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
    await User.deleteMany({});
  });

  it('should create a user with all fields', async () => {
    const userData = {
      firstName: 'John',
      lastName: 'Doe',
      userName: 'johndoe',
      password: 'password123',
      address: '123 Main St',
      city: 'Springfield',
      state: 'IL',
      zip: '62701',
      phone: '217-555-0100',
      email: 'john@example.com'
    };

    const user = await User.create(userData);
    expect(user).to.have.property('_id');
    expect(user.firstName).to.equal('John');
    expect(user.lastName).to.equal('Doe');
    expect(user.userName).to.equal('johndoe');
    expect(user.email).to.equal('john@example.com');
  });

  it('should find a user by id', async () => {
    const userData = {
      firstName: 'Jane',
      lastName: 'Smith',
      userName: 'janesmith',
      password: 'password456',
      email: 'jane@example.com'
    };

    const createdUser = await User.create(userData);
    const foundUser = await User.findById(createdUser._id);
    
    expect(foundUser).to.exist;
    expect(foundUser.userName).to.equal('janesmith');
  });

  it('should find a user by userName', async () => {
    const userData = {
      firstName: 'Bob',
      lastName: 'Johnson',
      userName: 'bobjohnson',
      password: 'password789',
      email: 'bob@example.com'
    };

    await User.create(userData);
    const foundUser = await User.findOne({ userName: 'bobjohnson' });
    
    expect(foundUser).to.exist;
    expect(foundUser.firstName).to.equal('Bob');
  });

  it('should update a user', async () => {
    const userData = {
      firstName: 'Alice',
      lastName: 'Brown',
      userName: 'alicebrown',
      email: 'alice@example.com'
    };

    const createdUser = await User.create(userData);
    const updatedUser = await User.findByIdAndUpdate(
      createdUser._id,
      { email: 'alice.brown@example.com', city: 'New York' },
      { new: true }
    );

    expect(updatedUser.email).to.equal('alice.brown@example.com');
    expect(updatedUser.city).to.equal('New York');
  });

  it('should delete a user', async () => {
    const userData = {
      firstName: 'Charlie',
      lastName: 'Wilson',
      userName: 'charliewilson',
      email: 'charlie@example.com'
    };

    const createdUser = await User.create(userData);
    const deletedUser = await User.findByIdAndDelete(createdUser._id);

    expect(deletedUser._id.toString()).to.equal(createdUser._id.toString());
    
    const foundUser = await User.findById(createdUser._id);
    expect(foundUser).to.be.null;
  });

  it('should find all users', async () => {
    const users = [
      { firstName: 'User1', userName: 'user1', email: 'user1@example.com' },
      { firstName: 'User2', userName: 'user2', email: 'user2@example.com' },
      { firstName: 'User3', userName: 'user3', email: 'user3@example.com' }
    ];

    await User.create(users);
    const allUsers = await User.find();

    expect(allUsers).to.have.lengthOf(3);
  });

  it('should allow partial user creation', async () => {
    const userData = {
      firstName: 'Partial',
      userName: 'partial'
    };

    const user = await User.create(userData);
    expect(user).to.have.property('_id');
    expect(user.firstName).to.equal('Partial');
    expect(user.lastName).to.be.undefined;
  });
});
