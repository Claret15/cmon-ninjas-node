const chai = require('chai'),
  chaiHttp = require('chai-http'),
  expect = chai.expect,
  app = require('../../app');

const { EventStat } = require('../../db/models');
chai.use(chaiHttp);

describe('EventStat POST /api/members/:id/events', function() {
  describe('Create Event Stat', function() {
    afterEach('Delete Event Stat after each test', async function() {
      try {
        const foundStat = await EventStat.findOne({
          where: { member_id: 1, event_id: 3 }
        });
        foundStat.destroy();
      } catch (err) {
        throw new Error('Unable to delete Event Stat');
      }
    });

    it('should create a new Event Stat', function(done) {
      chai
        .request(app)
        .post('/api/members/1/events')
        .send({
          member_id: 1,
          event_id: 3,
          guild_id: 1,
          guildPts: 777,
          position: 1,
          soloPts: 888,
          league_id: 1,
          soloRank: 1,
          globalRank: 100
        })
        .end(function(err, res) {
          expect(res).to.have.status(201);
          expect(res.body.eventStat.member_id).to.equal(1);
          expect(res.body.eventStat.event_id).to.equal(3);
          expect(res.body.eventStat.guild_id).to.equal(1);
          expect(res.body.eventStat.guildPts).to.equal('777');
          expect(res.body.eventStat.position).to.equal(1);
          expect(res.body.eventStat.soloPts).to.equal('888');
          expect(res.body.eventStat.league_id).to.equal(1);
          expect(res.body.eventStat.globalRank).to.equal(100);
          expect(res.body.success).to.equal('Event Stat added');
          done();
        });
    });
  });

  describe('Attempt to create an Event Stat but Event Stat already exists', function() {
    before('Create a Event Stat before the test', async function() {
      try {
        await EventStat.create({
          member_id: 1,
          event_id: 3,
          guild_id: 1,
          guildPts: 777,
          position: 1,
          soloPts: 888,
          league_id: 1,
          soloRank: 1,
          globalRank: 100
        });
      } catch (err) {
        throw new Error('Unable to create Event Stat');
      }
    });

    after('Delete Event Stat after the test', async function() {
      try {
        const foundStat = await EventStat.findOne({
          where: { member_id: 1, event_id: 3 }
        });
        foundStat.destroy();
      } catch (err) {
        throw new Error('Unable to delete Event Stat');
      }
    });

    it('should return message: "Event Stat already exists"', function(done) {
      chai
        .request(app)
        .post('/api/members/1/events')
        .send({
          member_id: 1,
          event_id: 3,
          guild_id: 1,
          guildPts: 777,
          position: 1,
          soloPts: 888,
          league_id: 1,
          soloRank: 1,
          globalRank: 100
        })
        .end(function(err, res) {
          expect(res).to.have.status(422);
          expect(res.body.error).to.equal('Event Stat already exists');
          done();
        });
    });
  });

  describe('Test incorrect routes', function() {
    it('should return an error if route is incorrect', function(done) {
      chai
        .request(app)
        .post('/api/members/1/eventss')
        .send({
          member_id: 1,
          event_id: 3,
          guild_id: 1,
          guildPts: 777,
          position: 1,
          soloPts: 888,
          league_id: 1,
          soloRank: 1,
          globalRank: 100
        })
        .end(function(err, res) {
          expect(res).to.have.status(404);
          expect(res.body.error).to.equal('Not Found');
          done();
        });
    });
  });

  describe('Test validateEventStat middleware - PASS', function() {
    after('Delete Event Stat after each test', async function() {
      try {
        const foundStat = await EventStat.findOne({
          where: { member_id: 1, event_id: 3 }
        });
        foundStat.destroy();
      } catch (err) {
        throw new Error('Unable to delete Event Stat');
      }
    });

    it('should pass all express-validator checks', function(done) {
      chai
        .request(app)
        .post('/api/members/1/events')
        .send({
          member_id: 1,
          event_id: 3,
          guild_id: 1,
          guildPts: 777,
          position: 1,
          soloPts: 888,
          league_id: 1,
          soloRank: 1,
          globalRank: 100
        })
        .end(function(err, res) {
          expect(res).to.have.status(201);
          expect(res.body.eventStat.member_id).to.equal(1);
          expect(res.body.eventStat.event_id).to.equal(3);
          expect(res.body.eventStat.guild_id).to.equal(1);
          expect(res.body.eventStat.guildPts).to.equal('777');
          expect(res.body.eventStat.position).to.equal(1);
          expect(res.body.eventStat.soloPts).to.equal('888');
          expect(res.body.eventStat.league_id).to.equal(1);
          expect(res.body.eventStat.globalRank).to.equal(100);
          expect(res.body.success).to.equal('Event Stat added');
          done();
        });
    });
  });

  describe('Test validateMember middleware - FAIL', function() {
    it('should fail all express-validator checks', function(done) {
      chai
        .request(app)
        .post('/api/members/1/events')
        .send({
          member_id: 'a',
          event_id: 'k',
          guild_id: 'j',
          guildPts: +123113231223,
          position: 31,
          soloPts: -345376,
          league_id: 'l',
          soloRank: 211,
          globalRank: 'a'
        })
        .end(function(err, res) {
          expect(res).to.have.status(422);
          expect(res.body.errors).to.have.lengthOf(8);
          done();
        });
    });
  });
});
