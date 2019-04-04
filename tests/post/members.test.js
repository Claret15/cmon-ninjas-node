const chai = require('chai'),
  chaiHttp = require('chai-http'),
  expect = chai.expect,
  app = require('../../app');

const { Member } = require('../../db/models');
chai.use(chaiHttp);

describe('Members POST /api/members', function() {
  describe('Create a new Member', function() {
    afterEach('Delete Member after each test', async function() {
      try {
        const foundMember = await Member.findOne({ where: { name: 'Spilla' } });
        foundMember.destroy();
      } catch (err) {
        throw new Error('Unable to delete Member');
      }

    });

    it('should create a member without req.body.isActive, default value is true', function(done) {
      chai
        .request(app)
        .post('/api/members')
        .send({
          name: 'Spilla',
          title: 'Lords & Ladies',
          guild_id: 1
        })
        .end(function(err, res) {
          expect(res).to.have.status(201);
          expect(res.body.member.name).to.equal('Spilla');
          expect(res.body.member.title).to.equal('Lords &amp; Ladies');
          expect(res.body.member.guild_id).to.equal(1);
          expect(res.body.member.isActive).to.be.true;
          expect(res.body.success).to.equal('Member added');
          done();
        });
    });

    it('should create a member with req.body.active as false', function(done) {
      chai
        .request(app)
        .post('/api/members')
        .send({
          name: 'Spilla',
          title: 'Peasant',
          guild_id: 2,
          isActive: false
        })
        .end(function(err, res) {
          expect(res).to.have.status(201);
          expect(res.body.member.name).to.equal('Spilla');
          expect(res.body.member.title).to.equal('Peasant');
          expect(res.body.member.guild_id).to.equal(2);
          expect(res.body.member.isActive).to.be.false;
          expect(res.body.success).to.equal('Member added');
          done();
        });
    });
  });

  describe('Attempt to create a Member but Member already exists', function() {
    before('Create a member before the test', async function() {
      try {
        await Member.create({
          name: 'Spilla',
          title: 'Lords & Ladies',
          guild_id: 1
        });
      } catch (err) {
        throw new Error('Unable to create Member');
      }
    });

    after('Delete Member after the test', async function() {
      try {
        const foundMember = await Member.findOne({ where: { name: 'Spilla' } });
        foundMember.destroy();
      } catch (err) {
        throw new Error('Unable to delete Member');
      }
    });

    it('should return message: "Member already exists"', function(done) {
      chai
        .request(app)
        .post('/api/members')
        .send({
          name: 'Spilla',
          title: 'Lords & Ladies',
          guild_id: 1
        })
        .end(function(err, res) {
          expect(res).to.have.status(422);
          expect(res.body.error).to.equal('Member already exists');
          done();
        });
    });
  });

  describe('Test incorrect routes', function() {
    it('should return an error if route is incorrect', function(done) {
      chai
        .request(app)
        .post('/api/membersd')
        .send({
          name: 'Spilla',
          title: 'Peasant',
          guild_id: 2,
          isActive: false
        })
        .end(function(err, res) {
          expect(res).to.have.status(404);
          expect(res.body.error).to.equal('Not Found');
          done();
        });
    });
  });

  describe('Test validateMember middleware - PASS', function() {
    after('Delete Member after each test', async function() {
      try {
        const foundMember = await Member.findOne({ where: { name: 'Spilla' } });
        foundMember.destroy();
      } catch (err) {
        throw new Error('Unable to delete Member');
      }
    });

    it('should pass all express-validator checks', function(done) {
      chai
        .request(app)
        .post('/api/members')
        .send({
          name: 'Spilla',
          title: 'Lords &<br>',
          guild_id: 1,
          isActive: true
        })
        .end(function(err, res) {
          expect(res).to.have.status(201);
          expect(res.body.member.name).to.equal('Spilla');
          expect(res.body.member.name).to.have.lengthOf.within(1, 30);
          expect(res.body.member.title).to.equal('Lords &amp;&lt;br&gt;');
          expect(res.body.member.guild_id).to.be.a('number');
          expect(res.body.member.isActive).to.be.true;
          expect(res.body.success).to.equal('Member added');
          done();
        });
    });
  });

  describe('Test validateMember middleware - FAIL', function() {
    it('should fail all express-validator checks', function(done) {
      chai
        .request(app)
        .post('/api/members')
        .send({
          name: '',
          title: 'Lords & Ladies',
          guild_id: 'a',
          isActive: 'A'
        })
        .end(function(err, res) {
          expect(res).to.have.status(422);
          expect(res.body.errors).to.have.lengthOf.at.least(1);
          done();
        });
    });
  });
});
