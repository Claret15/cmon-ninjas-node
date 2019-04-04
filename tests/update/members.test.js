const chai = require('chai'),
  chaiHttp = require('chai-http'),
  expect = chai.expect,
  app = require('../../app');

chai.use(chaiHttp);
const { Member } = require('../../db/models');

describe('Members PUT /api/members/:id', function() {
  describe('Update Member', function() {
    let member = null;

    before('Create a member for update tests', async function() {
      try {
        member = await Member.create({
          name: 'Spilla',
          title: 'Lords & Ladies',
          guild_id: 1
        });
      } catch (err) {
        throw new Error('Unable to create Member');
      }
    });

    after('Delete Member after all tests completed', async function() {
      try {
        const foundMember = await Member.findOne({ where: { name: 'Allips' } });
        foundMember.destroy();
      } catch (err) {
        throw new Error('Unable to delete Member');
      }
    });

    it('should update a member', function(done) {
      chai
        .request(app)
        .put(`/api/members/${member.id}`)
        .send({
          name: 'Allips',
          title: 'Dukes & Duchesses',
          isActive: false,
          guild_id: 2
        })
        .end(function(err, res) {
          expect(res).to.have.status(201);
          expect(res.body.member.name).to.equal('Allips');
          expect(res.body.member.title).to.equal('Dukes &amp; Duchesses');
          expect(res.body.member.guild_id).to.equal(2);
          expect(res.body.member.isActive).to.be.false;
          expect(res.body.success).to.equal('Member updated');
          done();
        });
    });

    it('should fail validation and does not update a Member', function(done) {
      chai
        .request(app)
        .put(`/api/members/${member.id}`)
        .send({
          name: '',
          title: 'Peasant',
          guild_id: '',
          isActive: false
        })
        .end(function(err, res) {
          expect(res).to.have.status(422);
          expect(res.body.errors).to.have.lengthOf.at.least(1);
          done();
        });
    });
  });
});
