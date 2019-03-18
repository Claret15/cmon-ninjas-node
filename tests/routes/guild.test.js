const chai = require('chai'),
  chaiHttp = require('chai-http'),
  expect = chai.expect,
  app = require('../../app');
chai.use(chaiHttp);

describe('Guild routes', function() {
  describe('GET /api/guilds', function() {
    it('should retrieve a list of all guilds', function(done) {
      chai.request(app)
        .get('/api/guilds')
        .end(function(err, res) {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          expect(err).to.be.null;
          done();
        });
    });

    it('should return error with invalid query', function(done) {
      chai.request(app)
        .get('/api/membersasd')
        .end(function(err, res) {
          expect(res).to.have.status(404);
          expect(err).to.be.null;
          done();
        });
    });
  });

  describe('GET /api/guilds/:id', function() {
    it('should retrieve a guild by id', function(done) {
      chai.request(app)
        .get('/api/guilds/1')
        .end(function(err, res) {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          expect(err).to.be.null;
          done();
        });
    });

    it('should return an error if guild does not exist', function(done) {
      chai.request(app)
        .get('/api/guilds/12')
        .end(function(err, res) {
          expect(res).to.have.status(404);
          expect(res.body)
            .to.be.an('object')
            .to.be.eql({ error: 'Not Found' });
          done();
        });
    });

    it('should return error with invalid query', function(done) {
      chai.request(app)
        .get('/api/guilds/asd9 ')
        .end(function(err, res) {
          expect(res).to.have.status(500);
          expect(res.body)
            .to.be.an('object')
            .to.be.eql({ error: 'Invalid Query' });
          done();
        });
    });
  });
});
