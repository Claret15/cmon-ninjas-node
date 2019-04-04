const chai = require('chai'),
  chaiHttp = require('chai-http'),
  expect = chai.expect,
  app = require('../../app');

const { EventStat } = require('../../db/models');
chai.use(chaiHttp);

describe('EventStat PUT /api/members/:id/events/:event_id', function() {
  describe('Update EventStat', function() {
    let eventStat = null;

    before('Create a EventStat for update tests', async function() {
      try {
        eventStat = await EventStat.create({
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

    after('Delete EventStat after all tests completed', async function() {
      try {
        const foundStat = await EventStat.findOne({
          where: { member_id: 2, event_id: 2 }
        });
        foundStat.destroy();
      } catch (err) {
        throw new Error('Unable to delete Event Stat');
      }
    });

    it('should update EventStat', function(done) {
      chai
        .request(app)
        .put(`/api/members/1/events/${eventStat.id}`)
        .send({
          member_id: 2,
          event_id: 2,
          guild_id: 2,
          guildPts: 222222222,
          position: 22,
          soloPts: 222222222,
          league_id: 2,
          soloRank: 22,
          globalRank: 2222
        })
        .end(function(err, res) {
          expect(res).to.have.status(201);
          expect(res.body.eventStat.member_id).to.equal(2);
          expect(res.body.eventStat.event_id).to.equal(2);
          expect(res.body.eventStat.guild_id).to.equal(2);
          expect(res.body.eventStat.guildPts).to.equal(222222222);
          expect(res.body.eventStat.position).to.equal(22);
          expect(res.body.eventStat.soloPts).to.equal(222222222);
          expect(res.body.eventStat.league_id).to.equal(2);
          expect(res.body.eventStat.globalRank).to.equal(2222);
          expect(res.body.success).to.equal('Event Stat updated');
          done();
        });
    });

    it('should fail validation and does not update EventStat', function(done) {
      chai
        .request(app)
        .put(`/api/members/1/events/${eventStat.id}`)
        .send({
          member_id: 'a',
          event_id: 'a',
          guild_id: 'a',
          guildPts: -22222,
          position: 232,
          soloPts: -22222,
          league_id: 5,
          soloRank: -22,
          globalRank: -2222
        })
        .end(function(err, res) {
          expect(res).to.have.status(422);
          expect(res.body.errors).to.have.lengthOf.at.least(1);
          done();
        });
    });
  });
});
