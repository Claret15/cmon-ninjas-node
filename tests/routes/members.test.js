const chai = require('chai'),
  chaiHttp = require('chai-http'),
  expect = chai.expect,
  app = require('../../app');
chai.use(chaiHttp);

describe('Members routes', function() {
  describe('GET /api/members', function() {
    it('should retrieve a list of all members', function(done) {
      chai.request(app)
        .get('/api/members')
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

  describe('GET /api/members/:id', function() {
    it('should retrieve a single member', function(done) {
      chai.request(app)
        .get('/api/members/1')
        .end(function(err, res) {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          expect(err).to.be.null;
          done();
        });
    });

    it('should return an error if member does not exist', function(done) {
      chai.request(app)
        .get('/api/members/13')
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
        .get('/api/members/asd')
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
