const chai = require('chai'),
  chaiHttp = require('chai-http'),
  expect = chai.expect,
  app = require('../../app');

const { Event } = require('../../db/models');
chai.use(chaiHttp);

describe('Events DELETE /api/event_types/:id', function() {
  describe('Delete Event', function() {
    before('Create an Event before the test', async function() {
      try {
        await Event.create({
          name: 'Game of Thrones',
          eventType_id: 3,
          date: '2019-04-01'
        });
      } catch (err) {
        throw new Error('Unable to create Event');
      }
    });

    it('should delete an Event', async function() {
      const foundEvent = await Event.findOne({
        where: { name: 'Game of Thrones' }
      });
      const foundEventId = foundEvent.id;
      const res = await chai.request(app).delete(`/api/events/${foundEventId}`);

      expect(res).to.have.status(200);
      expect(res.body.success).to.equal('Event deleted');
    });

    it('delete fails if Event does not exist', async function() {
      const res = await chai.request(app).delete('/api/events/100');

      expect(res).to.have.status(404);
      expect(res.body.error).to.equal('Event does not exist');
    });
  });
});
