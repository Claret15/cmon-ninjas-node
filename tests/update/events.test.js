const chai = require('chai'),
  chaiHttp = require('chai-http'),
  expect = chai.expect,
  app = require('../../app');

chai.use(chaiHttp);

describe('Events PUT /api/events/:id', function() {
  describe('Update Event', function() {
    it('should update Event', function(done) {
      chai
        .request(app)
        .put('/api/events/1')
        .send({
          name: 'Return To The Wastelands',
          date: '2019-04-04',
          eventType_id: 3
        })
        .end(function(err, res) {
          expect(res).to.have.status(201);
          expect(res.body.event.name).to.equal('Return To The Wastelands');
          expect(res.body.event.date).to.equal('2019-04-04');
          expect(res.body.success).to.equal('Event updated');
          done();
        });
    });

    it('should fail validation and does not update Event', function(done) {
      chai
        .request(app)
        .put('/api/events/1')
        .send({
          name: '',
          date: '20191304',
          eventType_id: 'a'
        })
        .end(function(err, res) {
          expect(res).to.have.status(422);
          expect(res.body.errors).to.have.lengthOf.at.least(1);
          done();
        });
    });
  });
});
