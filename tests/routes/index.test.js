const chai = require('chai'),
  chaiHttp = require('chai-http'),
  expect = chai.expect,
  app = require('../../app'),
  db = require('../../db/models');

chai.use(chaiHttp);

after(function() {
  db.sequelize.close();
});

describe('Home route', function() {
  describe('GET /', function() {
    it('should get the home page', function(done) {
      chai.request(app)
        .get('/')
        .end(function(err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          done();
        });
    });
  });

  describe('GET incorrect path', function() {
    it('should return status 404 | Not Found', function(done) {
      chai.request(app)
        .get('/asdfas')
        .end(function(err, res) {
          if (app.get('env') === 'development') {
            expect(res.error).to.have.status(404);
            expect(err).to.be.null;
          } else {
            expect(err).to.be.null;
            expect(res).to.have.status(404);
            expect(res.res.statusMessage).to.equal('Not Found');
          }
          done();
        });
    });
  });
});
