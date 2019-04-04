const chai = require('chai'),
  chaiHttp = require('chai-http'),
  expect = chai.expect,
  app = require('../../app');
const { Event } = require('../../db/models');
chai.use(chaiHttp);

describe('Event PUT /api/events/:id', function() {
  describe('Update Event', function() {
    let event = null;

    before('Create a member for update tests', async function() {
      try {
        event = await Event.create({
          name: 'Game of Thrones',
          date: '2019-03-04',
          eventType_id: 2
        });
      } catch (err) {
        throw new Error('Unable to create Event');
      }
    });

    after('Delete Member after all tests completed', async function() {
      try {
        const foundEvent = await Event.findOne({
          where: { name: 'Return To The Wastelands' }
        });
        foundEvent.destroy();
      } catch (err) {
        throw new Error('Unable to delete Event');
      }
    });

    it('should update Event', function(done) {
      chai
        .request(app)
        .put(`/api/events/${event.id}`)
        .send({
          name: 'Return To The Wastelands',
          date: '2019-04-04',
          eventType_id: 3
        })
        .end(function(err, res) {
          expect(res).to.have.status(201);
          expect(res.body.event.name).to.equal('Return To The Wastelands');
          expect(res.body.event.date).to.equal('2019-04-04');
          expect(res.body.event.eventType_id).to.equal(3);
          expect(res.body.success).to.equal('Event updated');
          done();
        });
    });

    it('should fail validation and does not update Event', function(done) {
      chai
        .request(app)
        .put(`/api/events/${event.id}`)
        .send({
          name: '',
          date: '20191304',
          eventType_id: 'a'
        })
        .end(function(err, res) {
          expect(res).to.have.status(422);
          expect(res.body.errors).to.have.lengthOf.at.least(1);
          done();
        });
    });
  });
});
