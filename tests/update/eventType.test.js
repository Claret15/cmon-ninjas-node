const chai = require('chai'),
  chaiHttp = require('chai-http'),
  expect = chai.expect,
  app = require('../../app');
const { EventType } = require('../../db/models');
chai.use(chaiHttp);

describe('EventType PUT /api/event_types/:id', function() {
  describe('Update EventType', function() {
    let eventType = null;

    before('Create a EventType for update tests', async function() {
      try {
        eventType = await EventType.create({
          name: 'Deathmatch'
        });
      } catch (err) {
        throw new Error('Unable to create Event Type');
      }
    });

    after('Delete EventType after all tests completed', async function() {
      try {
        const foundEventType = await EventType.findOne({
          where: { name: 'Domination' }
        });
        foundEventType.destroy();
      } catch (err) {
        throw new Error('Unable to delete Event Type');
      }
    });

    it('should update EventType', function(done) {
      chai
        .request(app)
        .put(`/api/event_types/${eventType.id}`)
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
        .put(`/api/event_types/${eventType.id}`)
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
