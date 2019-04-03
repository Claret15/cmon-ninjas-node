const chai = require('chai'),
  chaiHttp = require('chai-http'),
  expect = chai.expect,
  app = require('../../app');

const { League } = require('../../db/models');
chai.use(chaiHttp);

describe('Leagues POST /api/guilds', function() {
  describe('Create a new League', function() {
    afterEach('Delete League after each test', async function() {
      // Find all records from the database, returns an array
      let leagues = await League.findAll();
      // Calculate last index of the array
      let lastIndex = leagues.length - 1;
      // Delete Guild instance
      leagues[lastIndex].destroy();
    });

    it('should create a new League', function(done) {
      chai
        .request(app)
        .post('/api/leagues')
        .send({
          name: 'Commando'
        })
        .end(function(err, res) {
          expect(res).to.have.status(201);
          expect(res.body.league.name).to.equal('Commando');
          expect(res.body.success).to.equal('League added');
          done();
        });
    });
  });

  describe('Attempt to create a League but League already exists', function() {
    before('Create a League before the test', async function() {
      await chai
        .request(app)
        .post('/api/leagues')
        .send({
          name: 'Commando'
        });
    });

    after('Delete League after the test', async function() {
      let leagues = await League.findAll();
      let lastIndex = leagues.length - 1;
      leagues[lastIndex].destroy();
    });

    it('should return message: "League already exists"', function(done) {
      chai
        .request(app)
        .post('/api/leagues')
        .send({
          name: 'Commando'
        })
        .end(function(err, res) {
          expect(res).to.have.status(422);
          expect(res.body.error).to.equal('League already exists');
          done();
        });
    });
  });

  describe('Test incorrect routes', function() {
    it('should return an error if route is incorrect', function(done) {
      chai
        .request(app)
        .post('/api/leaguess')
        .send({
          name: 'Commando'
        })
        .end(function(err, res) {
          expect(res).to.have.status(404);
          expect(res.body.error).to.equal('Not Found');
          done();
        });
    });
  });

  describe('Test validateLeague middleware - PASS', function() {
    after('Delete League after the test', async function() {
      let leagues = await League.findAll();
      let lastIndex = leagues.length - 1;
      leagues[lastIndex].destroy();
    });

    it('should pass all express-validator checks', function(done) {
      chai
        .request(app)
        .post('/api/leagues')
        .send({
          name: 'Commando<br>'
        })
        .end(function(err, res) {
          expect(res).to.have.status(201);
          expect(res.body.league.name).to.equal('Commando&lt;br&gt;');
          expect(res.body.league.name).to.have.lengthOf.within(1, 20);
          expect(res.body.success).to.equal('League added');
          done();
        });
    });
  });

  describe('Test validateLeague middleware - FAIL', function() {
    it('should fail if name is empty', function(done) {
      chai
        .request(app)
        .post('/api/leagues')
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
        .post('/api/leagues')
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
