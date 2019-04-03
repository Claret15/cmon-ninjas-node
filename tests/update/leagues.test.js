const chai = require('chai'),
  chaiHttp = require('chai-http'),
  expect = chai.expect,
  app = require('../../app');

chai.use(chaiHttp);

describe('Leagues PUT /api/leagues', function() {
  describe('Update Leagues', function() {
    it('should update League', function(done) {
      chai
        .request(app)
        .put('/api/leagues/1')
        .send({
          name: 'Ultimate'
        })
        .end(function(err, res) {
          expect(res).to.have.status(201);
          expect(res.body.league.name).to.equal('Ultimate');
          expect(res.body.success).to.equal('League updated');
          done();
        });
    });

    it('should fail validation and does not update League', function(done) {
      chai
        .request(app)
        .put('/api/leagues/1')
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
