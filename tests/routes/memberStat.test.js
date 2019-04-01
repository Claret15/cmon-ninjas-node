const chai = require('chai'),
  chaiHttp = require('chai-http'),
  expect = chai.expect,
  app = require('../../app');

chai.use(chaiHttp);

describe('Member Event Stats routes', function() {
  describe('GET /api/members/1/events', function() {
    it('should retrieve a list of all event stats', function(done) {
      chai
        .request(app)
        .get('/api/members/1/events')
        .end(function(err, res) {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          expect(err).to.be.null;
          done();
        });
    });

    it('should return an error if member does not exist', function(done) {
      chai
        .request(app)
        .get('/api/members/1231/events')
        .end(function(err, res) {
          expect(res).to.have.status(404);
          expect(res.body)
            .to.be.an('object')
            .to.be.eql({ error: 'Not Found' });
          done();
        });
    });

    it('should return error with invalid query', function(done) {
      chai
        .request(app)
        .get('/api/members/1/eventss')
        .end(function(err, res) {
          expect(res).to.have.status(404);
          expect(err).to.be.null;
          done();
        });
    });
  });

  describe('GET /api/members/:id/events/:event_id', function() {
    it('should retrieve a single event stat', function(done) {
      chai
        .request(app)
        .get('/api/members/1/events/1')
        .end(function(err, res) {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          expect(err).to.be.null;
          done();
        });
    });

    it('should return an error if event stat does not exist', function(done) {
      chai
        .request(app)
        .get('/api/members/1/events/343')
        .end(function(err, res) {
          expect(res).to.have.status(404);
          expect(res.body)
            .to.be.an('object')
            .to.be.eql({ error: 'Not Found' });
          done();
        });
    });

    it('should return an error if member AND event stat does not exist', function(done) {
      chai
        .request(app)
        .get('/api/members/132/events/343')
        .end(function(err, res) {
          expect(res).to.have.status(404);
          expect(res.body)
            .to.be.an('object')
            .to.be.eql({ error: 'Not Found' });
          done();
        });
    });

    it('should return an error with invalid query', function(done) {
      chai
        .request(app)
        .get('/api/members/1/events/s')
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
