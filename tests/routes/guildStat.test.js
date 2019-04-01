const chai = require('chai'),
  chaiHttp = require('chai-http'),
  expect = chai.expect,
  app = require('../../app');

chai.use(chaiHttp);

describe('Guild Event Stats routes', function() {
  describe('GET /api/guilds/:id/events/:event_id', function() {
    it('should retrieve all guild event stats', function(done) {
      chai
        .request(app)
        .get('/api/guilds/1/events/1')
        .end(function(err, res) {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          expect(err).to.be.null;
          done();
        });
    });

    it('should return "not found" if event does not exist', function(done) {
      chai
        .request(app)
        .get('/api/guilds/1/events/343')
        .end(function(err, res) {
          expect(res).to.have.status(404);
          expect(res.body)
            .to.be.an('object')
            .to.be.eql({ error: 'Not Found' });
          done();
        });
    });

    it('should return "not found" if Guild id AND Event id does not exist', function(done) {
      chai
        .request(app)
        .get('/api/guilds/132/events/343')
        .end(function(err, res) {
          expect(res).to.have.status(404);
          expect(res.body)
            .to.be.an('object')
            .to.be.eql({ error: 'Not Found' });
          done();
        });
    });

    it('should return an error with invalid query if event id is not valid', function(done) {
      chai
        .request(app)
        .get('/api/guilds/1/events/s')
        .end(function(err, res) {
          expect(res).to.have.status(500);
          expect(res.body)
            .to.be.an('object')
            .to.be.eql({ error: 'Invalid Query' });
          done();
        });
    });

    it('should return an error with invalid query  if guild id is not valid', function(done) {
      chai
        .request(app)
        .get('/api/guilds/a/events/1')
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
