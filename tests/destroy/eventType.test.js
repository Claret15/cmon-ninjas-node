const chai = require('chai'),
  chaiHttp = require('chai-http'),
  expect = chai.expect,
  app = require('../../app');

const { EventType } = require('../../db/models');
chai.use(chaiHttp);

describe('EventTypes DELETE /api/event_types/:id', function() {
  describe('Delete EventTypes', function() {
    before('Create a EventTypes before the test', async function() {
      try {
        await EventType.create({
          name: 'Domination'
        });
      } catch (err) {
        throw new Error('Unable to create Event Type');
      }
    });

    it('should delete an EventType', async function() {
      const foundEventType = await EventType.findOne({
        where: { name: 'Domination' }
      });
      const foundEventTypeId = foundEventType.id;
      const res = await chai
        .request(app)
        .delete(`/api/event_types/${foundEventTypeId}`);

      expect(res).to.have.status(200);
      expect(res.body.success).to.equal('Event Type deleted');
    });

    it('delete fails if EventType does not exist', async function() {
      const res = await chai.request(app).delete('/api/event_types/100');

      expect(res).to.have.status(404);
      expect(res.body.error).to.equal('Event Type does not exist');
    });
  });
});
