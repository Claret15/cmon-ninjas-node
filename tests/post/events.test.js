const chai = require('chai'),
  chaiHttp = require('chai-http'),
  expect = chai.expect,
  app = require('../../app');

const { Event } = require('../../db/models');
chai.use(chaiHttp);

describe('Event POST /api/events', function() {
  describe('Create a new Event', function() {
    after('Delete Event after each test', async function() {
      // Find all records from the database, returns an array
      let events = await Event.findAll();
      // Calculate last index of the array
      let lastIndex = events.length - 1;
      // Delete Event instance
      events[lastIndex].destroy();
    });

    it('should create an Event', function(done) {
      chai
        .request(app)
        .post('/api/events')
        .send({
          name: 'Game of Thrones',
          eventType_id: 3,
          date: '2019-04-01'
        })
        .end(function(err, res) {
          expect(res).to.have.status(201);
          expect(res.body.event.name).to.equal('Game of Thrones');
          expect(res.body.event.eventType_id).to.equal(3);
          expect(res.body.event.date).to.equal('2019-04-01');
          expect(res.body.success).to.equal('Event added');
          done();
        });
    });
  });

  describe('Attempt to create an Event but Event already exists', function() {
    before('Create an Event before the test', async function() {
      await chai
        .request(app)
        .post('/api/events')
        .send({
          name: 'Game of Thrones',
          eventType_id: 3,
          date: '2019-04-01'
        });
    });

    after('Delete Event after the test', async function() {
      let events = await Event.findAll();
      let lastIndex = events.length - 1;
      events[lastIndex].destroy();
    });

    it('should return message: "Event already exists"', function(done) {
      chai
        .request(app)
        .post('/api/events')
        .send({
          name: 'Game of Thrones',
          eventType_id: 3,
          date: '2019-04-01'
        })
        .end(function(err, res) {
          expect(res).to.have.status(422);
          expect(res.body.error).to.equal('Event already exists');
          done();
        });
    });
  });

  describe('Test incorrect routes', function() {
    it('should return an error if route is incorrect', function(done) {
      chai
        .request(app)
        .post('/api/eventss')
        .send({
          name: 'Game of Thrones',
          eventType_id: 3,
          date: '2019-04-01'
        })
        .end(function(err, res) {
          expect(res).to.have.status(404);
          expect(res.body.error).to.equal('Not Found');
          done();
        });
    });
  });

  describe('Test validateEvent middleware - PASS', function() {
    after('Delete Event after each test', async function() {
      let events = await Event.findAll();
      let lastIndex = events.length - 1;
      events[lastIndex].destroy();
    });

    it('should pass all express-validator checks', function(done) {
      chai
        .request(app)
        .post('/api/events')
        .send({
          name: 'Game of Thrones<script>',
          eventType_id: 3,
          date: '2019-04-01'
        })
        .end(function(err, res) {
          expect(res).to.have.status(201);
          expect(res.body.event.name).to.equal('Game of Thrones&lt;script&gt;');
          expect(res.body.event.name).to.have.lengthOf.within(1, 50);
          expect(res.body.event.eventType_id).to.equal(3);
          expect(res.body.success).to.equal('Event added');
          done();
        });
    });
  });

  describe('Test validateEvent middleware - FAIL', function() {
    it('should fail all express-validator checks', function(done) {
      chai
        .request(app)
        .post('/api/events')
        .send({
          name: 'Game of Thrasones<script>Game of Thrasones<script>',
          event_type_id: 'a',
          date: '20193131'
        })
        .end(function(err, res) {
          expect(res).to.have.status(422);
          expect(res.body.errors).to.have.lengthOf.within(1, 50);
          done();
        });
    });
  });
});
