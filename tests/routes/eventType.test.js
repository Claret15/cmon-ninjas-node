const chai = require('chai'),
  chaiHttp = require('chai-http'),
  expect = chai.expect,
  app = require('../../app');

chai.use(chaiHttp);

describe('Event Type routes', function() {
  describe('GET /api/event_types', function() {
    it('should retrieve a list of all event types', function(done) {
      chai
        .request(app)
        .get('/api/event_types')
        .end(function(err, res) {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          expect(err).to.be.null;
          done();
        });
    });

    it('should return error with invalid query', function(done) {
      chai.request(app)
        .get('/api/event_typesas')
        .end(function(err, res) {
          expect(res).to.have.status(404);
          expect(err).to.be.null;
          done();
        });
    });


    describe('GET /api/event_types/:id', function() {
      it('should retrieve a single event type', function(done) {
        chai.request(app)
          .get('/api/event_types/1')
          .end(function(err, res) {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            expect(err).to.be.null;
            done();
          });
      });
  
      it('should return an error if event type does not exist', function(done) {
        chai.request(app)
          .get('/api/event_types/13')
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
          .get('/api/event_types/asd')
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
});
