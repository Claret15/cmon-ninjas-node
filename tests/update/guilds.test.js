const chai = require('chai'),
  chaiHttp = require('chai-http'),
  expect = chai.expect,
  app = require('../../app');

chai.use(chaiHttp);

describe('Guilds PUT /api/guilds', function() {
  describe('Update Guild', function() {
    it('should update a Guild', function(done) {
      chai
        .request(app)
        .put('/api/guilds/1')
        .send({
          name: 'Ninjas Guild',
        })
        .end(function(err, res) {
          expect(res).to.have.status(201);
          expect(res.body.guild.name).to.equal('Ninjas Guild');
          expect(res.body.success).to.equal('Guild updated');
          done();
        });
    });

    it('should fail validation and does not update Guild', function(done) {
      chai
        .request(app)
        .put('/api/guilds/1')
        .send({
          name: '',
        })
        .end(function(err, res) {
          expect(res).to.have.status(422);
          expect(res.body.errors).to.have.lengthOf.at.least(1);
          done();
        });
    });
  });
});
