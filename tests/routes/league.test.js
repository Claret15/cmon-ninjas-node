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
      chai.request(app)
        .get('/api/leaguesd')
        .end(function(err, res) {
          expect(res).to.have.status(404);
          expect(err).to.be.null;
          done();
        });
    });
  });


});
