const chai = require('chai'),
  chaiHttp = require('chai-http'),
  expect = chai.expect,
  app = require('../../app');

chai.use(chaiHttp);

describe('EventType PUT /api/event_types', function() {
  describe('Update EventType', function() {
    it('should update EventType', function(done) {
      chai
        .request(app)
        .put('/api/event_types/1')
        .send({
          name: 'Domination'
        })
        .end(function(err, res) {
          expect(res).to.have.status(201);
          expect(res.body.eventType.name).to.equal('Domination');
          expect(res.body.success).to.equal('Event Type updated');
          done();
        });
    });

    it('should fail validation and does not update EventType', function(done) {
      chai
        .request(app)
        .put('/api/event_types/1')
        .send({
          name: ''
        })
        .end(function(err, res) {
          expect(res).to.have.status(422);
          expect(res.body.errors).to.have.lengthOf.at.least(1);
          done();
        });
    });
  });
});
