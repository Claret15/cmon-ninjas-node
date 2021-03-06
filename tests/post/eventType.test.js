const chai = require('chai'),
  chaiHttp = require('chai-http'),
  expect = chai.expect,
  app = require('../../app');

const { EventType } = require('../../db/models');
chai.use(chaiHttp);

describe('EventType POST /api/event_types', function() {
  describe('Create a new EventType', function() {
    afterEach('Delete EventType after each test', async function() {
      try {
        const foundEventType = await EventType.findOne({
          where: { name: 'Deathmatch' }
        });
        foundEventType.destroy();
      } catch (err) {
        throw new Error('Unable to delete Event Type');
      }
    });

    it('should create a new EventType', function(done) {
      chai
        .request(app)
        .post('/api/event_types')
        .send({
          name: 'Deathmatch'
        })
        .end(function(err, res) {
          expect(res).to.have.status(201);
          expect(res.body.eventType.name).to.equal('Deathmatch');
          expect(res.body.success).to.equal('Event Type added');
          done();
        });
    });
  });

  describe('Attempt to create a EventType but EventType already exists', function() {
    before('Create a EventType before the test', async function() {
      try {
        await EventType.create({
          name: 'Deathmatch'
        });
      } catch (err) {
        throw new Error('Unable to create Event Type');
      }
    });

    after('Delete EventType after the test', async function() {
      try {
        const foundEventType = await EventType.findOne({
          where: { name: 'Deathmatch' }
        });
        foundEventType.destroy();
      } catch (err) {
        throw new Error('Unable to delete Event Type');
      }
    });

    it('should return message: "EventType already exists"', function(done) {
      chai
        .request(app)
        .post('/api/event_types')
        .send({
          name: 'Deathmatch'
        })
        .end(function(err, res) {
          expect(res).to.have.status(422);
          expect(res.body.error).to.equal('Event Type already exists');
          done();
        });
    });
  });

  describe('Test incorrect routes', function() {
    it('should return an error if route is incorrect', function(done) {
      chai
        .request(app)
        .post('/api/event_typess')
        .send({
          name: 'Deathmatch'
        })
        .end(function(err, res) {
          expect(res).to.have.status(404);
          expect(res.body.error).to.equal('Not Found');
          done();
        });
    });
  });

  describe('Test validateEventType middleware - PASS', function() {
    after('Delete EventType after the test', async function() {
      try {
        const foundEventType = await EventType.findOne({
          where: { name: 'Deathmatch&lt;br&gt;' }
        });
        foundEventType.destroy();
      } catch (err) {
        throw new Error('Unable to delete Event Type');
      }
    });

    it('should pass all express-validator checks', function(done) {
      chai
        .request(app)
        .post('/api/event_types')
        .send({
          name: 'Deathmatch<br>'
        })
        .end(function(err, res) {
          expect(res).to.have.status(201);
          expect(res.body.eventType.name).to.equal('Deathmatch&lt;br&gt;');
          expect(res.body.eventType.name).to.have.lengthOf.within(1, 20);
          expect(res.body.success).to.equal('Event Type added');
          done();
        });
    });
  });

  describe('Test validateEventType middleware - FAIL', function() {
    it('should fail if name is empty', function(done) {
      chai
        .request(app)
        .post('/api/event_types')
        .send({
          name: ''
        })
        .end(function(err, res) {
          expect(res).to.have.status(422);
          expect(res.body.errors).to.have.lengthOf.at.least(1);
          done();
        });
    });

    it('should fail if name exceeds 20 characters', function(done) {
      chai
        .request(app)
        .post('/api/event_types')
        .send({
          name: 'asdfasfasdfasfsadfsadfsdaf'
        })
        .end(function(err, res) {
          expect(res).to.have.status(422);
          expect(res.body.errors).to.have.lengthOf.at.most(20);
          done();
        });
    });
  });
});
