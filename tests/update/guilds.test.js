const chai = require('chai'),
  chaiHttp = require('chai-http'),
  expect = chai.expect,
  app = require('../../app');

const { Guild } = require('../../db/models');
chai.use(chaiHttp);

describe('Guilds PUT /api/guilds/:id', function() {
  describe('Update Guild', function() {
    let guild = null;

    before('Create a Guild for update tests', async function() {
      try {
        guild = await Guild.create({
          name: 'SAS'
        });
      } catch (err) {
        throw new Error('Unable to create Guild');
      }
    });

    after('Delete Guild after all tests completed', async function() {
      try {
        const foundGuild = await Guild.findOne({ where: { name: 'SEALS' } });
        foundGuild.destroy();
      } catch (err) {
        throw new Error('Unable to delete Guild');
      }
    });

    it('should update a Guild', function(done) {
      chai
        .request(app)
        .put(`/api/guilds/${guild.id}`)
        .send({
          name: 'SEALS'
        })
        .end(function(err, res) {
          expect(res).to.have.status(201);
          expect(res.body.guild.name).to.equal('SEALS');
          expect(res.body.success).to.equal('Guild updated');
          done();
        });
    });

    it('should fail validation and does not update Guild', function(done) {
      chai
        .request(app)
        .put(`/api/guilds/${guild.id}`)
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
