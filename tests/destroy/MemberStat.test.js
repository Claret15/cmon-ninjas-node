const chai = require('chai'),
  chaiHttp = require('chai-http'),
  expect = chai.expect,
  app = require('../../app');

const { EventStat } = require('../../db/models');
chai.use(chaiHttp);

describe('MemberStat DELETE /api/members/:id/events/:event_id', function() {
  describe('Delete EventStat', function() {
    before('Create an EventStat before the test', async function() {
      try {
        await EventStat.create({
          member_id: 1,
          event_id: 3,
          guild_id: 1,
          guildPts: 777,
          position: 1,
          soloPts: 888,
          league_id: 1,
          soloRank: 1,
          globalRank: 100
        });
      } catch (err) {
        throw new Error('Unable to create Event Stat');
      }
    });

    it('should delete an Event', async function() {
      const foundEventStat = await EventStat.findOne({
        where: { member_id: 1, event_id: 3 }
      });
      const foundEventStatId = foundEventStat.id;
      const res = await chai
        .request(app)
        .delete(`/api/members/1/events/${foundEventStatId}`);

      expect(res).to.have.status(200);
      expect(res.body.success).to.equal('Event Stat deleted');
    });

    it('delete fails if Event Stat does not exist', async function() {
      const res = await chai.request(app).delete('/api/members/1/events/100');

      expect(res).to.have.status(404);
      expect(res.body.error).to.equal('Event Stat does not exist');
    });
  });
});
