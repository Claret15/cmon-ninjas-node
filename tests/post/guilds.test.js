const chai = require('chai'),
  chaiHttp = require('chai-http'),
  expect = chai.expect,
  app = require('../../app');

const { Guild } = require('../../db/models');
chai.use(chaiHttp);

describe('Guilds POST /api/guilds', function() {
  describe('Create a new Guild', function() {
    afterEach('Delete Guild after each test', async function() {
      // Find all records from the database, returns an array
      let guilds = await Guild.findAll();
      // Calculate last index of the array
      let lastIndex = guilds.length - 1;
      // Delete Guild instance
      guilds[lastIndex].destroy();
    });

    it('should create a new Guild', function(done) {
      chai
        .request(app)
        .post('/api/guilds')
        .send({
          name: 'Warriors'
        })
        .end(function(err, res) {
          expect(res).to.have.status(201);
          expect(res.body.guild.name).to.equal('Warriors');
          expect(res.body.success).to.equal('Guild added');
          done();
        });
    });
  });

  describe('Attempt to create a Guild but Guild already exists', function() {
    before('Create a Guild before the test', async function() {
      await chai
        .request(app)
        .post('/api/guilds')
        .send({
          name: 'Warriors'
        });
    });

    after('Delete Guild after the test', async function() {
      let guilds = await Guild.findAll();
      let lastIndex = guilds.length - 1;
      guilds[lastIndex].destroy();
    });

    it('should return message: "Guild already exists"', function(done) {
      chai
        .request(app)
        .post('/api/guilds')
        .send({
          name: 'Warriors'
        })
        .end(function(err, res) {
          expect(res).to.have.status(422);
          expect(res.body.error).to.equal('Guild already exists');
          done();
        });
    });
  });

  describe('Test incorrect routes', function() {
    it('should return an error if route is incorrect', function(done) {
      chai
        .request(app)
        .post('/api/guildsd')
        .send({
          name: 'Warriors'
        })
        .end(function(err, res) {
          expect(res).to.have.status(404);
          expect(res.body.error).to.equal('Not Found');
          done();
        });
    });
  });

  describe('Test validateGuild middleware - PASS', function() {
    after('Delete Guild after the test', async function() {
      let guilds = await Guild.findAll();
      let lastIndex = guilds.length - 1;
      guilds[lastIndex].destroy();
    });

    it('should pass all express-validator checks', function(done) {
      chai
        .request(app)
        .post('/api/guilds')
        .send({
          name: 'Warriors<script>'
        })
        .end(function(err, res) {
          expect(res).to.have.status(201);
          expect(res.body.guild.name).to.equal('Warriors&lt;script&gt;');
          expect(res.body.guild.name).to.have.lengthOf.within(1, 25);
          expect(res.body.success).to.equal('Guild added');
          done();
        });
    });
  });

  describe('Test validateGuild middleware - FAIL', function() {
    it('should fail if name is empty', function(done) {
      chai
        .request(app)
        .post('/api/guilds')
        .send({
          name: ''
        })
        .end(function(err, res) {
          expect(res).to.have.status(422);
          expect(res.body.errors).to.have.lengthOf.at.least(1);
          done();
        });
    });

    it('should fail if name exceeds 25 characters', function(done) {
      chai
        .request(app)
        .post('/api/guilds')
        .send({
          name: 'asdfasfasdfasfsadfsadfsdaf'
        })
        .end(function(err, res) {
          expect(res).to.have.status(422);
          expect(res.body.errors).to.have.lengthOf.at.most(25);
          done();
        });
    });
  });
});
