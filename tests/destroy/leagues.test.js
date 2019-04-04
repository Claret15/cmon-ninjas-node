const chai = require('chai'),
  chaiHttp = require('chai-http'),
  expect = chai.expect,
  app = require('../../app');

const { League } = require('../../db/models');
chai.use(chaiHttp);

describe('Leagues DELETE /api/leagues/:id', function() {
  describe('Delete League', function() {
    before('Create a League before the test', async function() {
      try {
        await League.create({
          name: 'Extreme'
        });
      } catch (err) {
        throw new Error('Unable to create League');
      }
    });

    it('should delete a League', async function() {
      const foundLeague = await League.findOne({ where: { name: 'Extreme' } });
      const foundLeagueId = foundLeague.id;
      const res = await chai
        .request(app)
        .delete(`/api/leagues/${foundLeagueId}`);

      expect(res).to.have.status(200);
      expect(res.body.success).to.equal('League deleted');
    });

    it('delete fails if League does not exist', async function() {
      const res = await chai.request(app).delete('/api/leagues/100');

      expect(res).to.have.status(404);
      expect(res.body.error).to.equal('League does not exist');
    });
  });
});
