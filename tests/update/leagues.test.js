const chai = require('chai'),
  chaiHttp = require('chai-http'),
  expect = chai.expect,
  app = require('../../app');

const { League } = require('../../db/models');
chai.use(chaiHttp);

describe('Leagues PUT /api/leagues/:id', function() {
  describe('Update Leagues', function() {
    let league = null;

    before('Create a League tests', async function() {
      try {
        league = await League.create({
          name: 'Ultimate'
        });
      } catch (err) {
        throw new Error('Unable to create League');
      }
    });

    after('Delete League after all tests completed', async function() {
      try {
        const foundLeague = await League.findOne({ where: { name: 'Ultra' } });
        foundLeague.destroy();
      } catch (err) {
        throw new Error('Unable to delete League');
      }
    });

    it('should update League', function(done) {
      chai
        .request(app)
        .put(`/api/leagues/${league.id}`)
        .send({
          name: 'Ultra'
        })
        .end(function(err, res) {
          expect(res).to.have.status(201);
          expect(res.body.league.name).to.equal('Ultra');
          expect(res.body.success).to.equal('League updated');
          done();
        });
    });

    it('should fail validation and does not update League', function(done) {
      chai
        .request(app)
        .put(`/api/leagues/${league.id}`)
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
