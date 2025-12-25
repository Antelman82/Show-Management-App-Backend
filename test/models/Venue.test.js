const { expect } = require('chai');
const mongoose = require('mongoose');
const Venue = require('../../models/Venue');
const { MongoMemoryServer } = require('mongodb-memory-server');

describe('Venue Model', () => {
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
    await Venue.deleteMany({});
  });

  it('should create a venue with all fields', async () => {
    const venueData = {
      venue: 'Central Park',
      address: '123 Park Ave',
      city: 'New York',
      state: 'NY',
      country: 'USA',
      zip: '10024'
    };

    const venue = await Venue.create(venueData);
    expect(venue).to.have.property('_id');
    expect(venue.venue).to.equal('Central Park');
    expect(venue.city).to.equal('New York');
  });

  it('should find a venue by id', async () => {
    const venueData = {
      venue: 'Downtown Park',
      address: '456 Main St',
      city: 'Springfield',
      state: 'IL',
      zip: '62701'
    };

    const createdVenue = await Venue.create(venueData);
    const foundVenue = await Venue.findById(createdVenue._id);

    expect(foundVenue).to.exist;
    expect(foundVenue.venue).to.equal('Downtown Park');
  });

  it('should update a venue', async () => {
    const venueData = {
      venue: 'Old Stadium',
      city: 'Boston',
      state: 'MA'
    };

    const createdVenue = await Venue.create(venueData);
    const updatedVenue = await Venue.findByIdAndUpdate(
      createdVenue._id,
      { venue: 'New Stadium', address: '789 Sports Lane' },
      { new: true }
    );

    expect(updatedVenue.venue).to.equal('New Stadium');
    expect(updatedVenue.address).to.equal('789 Sports Lane');
  });

  it('should delete a venue', async () => {
    const venueData = {
      venue: 'Temporary Venue',
      city: 'Los Angeles'
    };

    const createdVenue = await Venue.create(venueData);
    const deletedVenue = await Venue.findByIdAndDelete(createdVenue._id);

    expect(deletedVenue._id.toString()).to.equal(createdVenue._id.toString());

    const foundVenue = await Venue.findById(createdVenue._id);
    expect(foundVenue).to.be.null;
  });

  it('should find all venues', async () => {
    const venues = [
      { venue: 'Venue 1', city: 'City 1', state: 'ST1' },
      { venue: 'Venue 2', city: 'City 2', state: 'ST2' },
      { venue: 'Venue 3', city: 'City 3', state: 'ST3' }
    ];

    await Venue.create(venues);
    const allVenues = await Venue.find();

    expect(allVenues).to.have.lengthOf(3);
  });

  it('should handle complete address information', async () => {
    const venueData = {
      venue: 'Complete Address Venue',
      address: '999 Broadway',
      city: 'San Francisco',
      state: 'CA',
      country: 'USA',
      zip: '94102'
    };

    const venue = await Venue.create(venueData);
    expect(venue.country).to.equal('USA');
    expect(venue.zip).to.equal('94102');
  });
});
