const { expect } = require('chai');
const mongoose = require('mongoose');
const Show = require('../../models/Show');
const { MongoMemoryServer } = require('mongodb-memory-server');

describe('Show Model', () => {
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
    await Show.deleteMany({});
  });

  it('should create a show with all fields', async () => {
    const showData = {
      businessName: 'Pyrotechnic Spectacular',
      status: 'scheduled',
      date: '2025-12-31',
      venue: 'Downtown Park',
      type: 'Fireworks',
      user: ['user1', 'user2'],
      role: ['manager', 'technician']
    };

    const show = await Show.create(showData);
    expect(show).to.have.property('_id');
    expect(show.businessName).to.equal('Pyrotechnic Spectacular');
    expect(show.status).to.equal('scheduled');
    expect(show.user).to.have.lengthOf(2);
  });

  it('should find a show by id', async () => {
    const showData = {
      businessName: 'Summer Festival',
      date: '2025-07-04',
      venue: 'Central Park',
      type: 'Special Effects'
    };

    const createdShow = await Show.create(showData);
    const foundShow = await Show.findById(createdShow._id);

    expect(foundShow).to.exist;
    expect(foundShow.businessName).to.equal('Summer Festival');
  });

  it('should update a show', async () => {
    const showData = {
      businessName: 'New Year Celebration',
      date: '2026-01-01',
      status: 'planning'
    };

    const createdShow = await Show.create(showData);
    const updatedShow = await Show.findByIdAndUpdate(
      createdShow._id,
      { status: 'confirmed', date: '2026-01-02' },
      { new: true }
    );

    expect(updatedShow.status).to.equal('confirmed');
    expect(updatedShow.date).to.equal('2026-01-02');
  });

  it('should delete a show', async () => {
    const showData = {
      businessName: 'Holiday Spectacular',
      date: '2025-12-25'
    };

    const createdShow = await Show.create(showData);
    const deletedShow = await Show.findByIdAndDelete(createdShow._id);

    expect(deletedShow._id.toString()).to.equal(createdShow._id.toString());

    const foundShow = await Show.findById(createdShow._id);
    expect(foundShow).to.be.null;
  });

  it('should find all shows', async () => {
    const shows = [
      { businessName: 'Show1', date: '2025-06-01' },
      { businessName: 'Show2', date: '2025-07-01' },
      { businessName: 'Show3', date: '2025-08-01' }
    ];

    await Show.create(shows);
    const allShows = await Show.find();

    expect(allShows).to.have.lengthOf(3);
  });

  it('should allow shows with array fields', async () => {
    const showData = {
      businessName: 'Multi-user Show',
      user: ['user1', 'user2', 'user3'],
      role: ['manager', 'technician', 'safety']
    };

    const show = await Show.create(showData);
    expect(show.user).to.have.lengthOf(3);
    expect(show.role).to.have.lengthOf(3);
  });
});
