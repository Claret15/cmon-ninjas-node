const chai = require('chai'),
  chaiHttp = require('chai-http'),
  expect = chai.expect,
  app = require('../../app');

const { Member } = require('../../db/models');
chai.use(chaiHttp);

describe('Members DELETE /api/members/:id', function() {
  describe('Delete Member', function() {
    before('Create a member before the test', async function() {
      try {
        await Member.create({
          name: 'Brutus',
          isActive: false,
          title: 'Kicked',
          guild_id: 1
        });
      } catch (err) {
        throw new Error('Unable to create Member');
      }
    });

    it('should delete a Member', async function() {
      const foundMember = await Member.findOne({ where: { name: 'Brutus' } });
      const foundMemberId = foundMember.id;
      const res = await chai
        .request(app)
        .delete(`/api/members/${foundMemberId}`);

      expect(res).to.have.status(200);
      expect(res.body.success).to.equal('Member deleted');
    });

    it('delete fails if Member does not exist', async function() {
      const res = await chai.request(app).delete('/api/members/100');

      expect(res).to.have.status(404);
      expect(res.body.error).to.equal('Member does not exist');
    });
  });
});
