const chai = require('chai'),
  chaiHttp = require('chai-http'),
  expect = chai.expect,
  app = require('../../app');
chai.use(chaiHttp);

describe('League routes', function() {
  describe('GET /api/leagues', function() {
    it('should retrieve a list of all guilds', function(done) {
      chai
        .request(app)
        .get('/api/leagues')
        .end(function(err, res) {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          expect(err).to.be.null;
          done();
        });
    });

    it('should return error with invalid query', function(done) {
      chai
        .request(app)
        .get('/api/leaguesd')
        .end(function(err, res) {
          expect(res).to.have.status(404);
          expect(err).to.be.null;
          done();
        });
    });
  });

  describe('GET /api/leagues/:id', function() {
    it('should retrieve a single league', function(done) {
      chai
        .request(app)
        .get('/api/leagues/1')
        .end(function(err, res) {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          expect(err).to.be.null;
          done();
        });
    });

    it('should return an error if league does not exist', function(done) {
      chai
        .request(app)
        .get('/api/leagues/13')
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
        .get('/api/leagues/asd')
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
