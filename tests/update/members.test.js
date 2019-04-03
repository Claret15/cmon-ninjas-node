const chai = require('chai'),
  chaiHttp = require('chai-http'),
  expect = chai.expect,
  app = require('../../app');

chai.use(chaiHttp);

describe('Members PUT /api/members/:id', function() {
  describe('Update Member', function() {
    it('should update a member', function(done) {
      chai
        .request(app)
        .put('/api/members/1')
        .send({
          name: 'Allips',
          title: 'Dukes & Duchesses',
          isActive: false,
          guild_id: 2
        })
        .end(function(err, res) {
          expect(res).to.have.status(201);
          expect(res.body.member.name).to.equal('Allips');
          expect(res.body.member.title).to.equal('Dukes &amp; Duchesses');
          expect(res.body.member.guild_id).to.equal(2);
          expect(res.body.member.isActive).to.be.false;
          expect(res.body.success).to.equal('Member updated');
          done();
        });
    });

    it('should fail validation and does not update a Member', function(done) {
      chai
        .request(app)
        .put('/api/members/1')
        .send({
          name: '',
          title: 'Peasant',
          guild_id: '',
          isActive: false
        })
        .end(function(err, res) {
          expect(res).to.have.status(422);
          expect(res.body.errors).to.have.lengthOf.at.least(1);
          done();
        });
    });
  });
});
