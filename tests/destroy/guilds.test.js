const chai = require('chai'),
  chaiHttp = require('chai-http'),
  expect = chai.expect,
  app = require('../../app');

const { Guild } = require('../../db/models');
chai.use(chaiHttp);

describe('Guilds DELETE /api/guilds/:id', function() {
  describe('Delete Guild', function() {
    before('Create a Guild before the test', async function() {
      try {
        await Guild.create({
          name: 'Monsters'
        });
      } catch (err) {
        throw new Error('Unable to create Guild');
      }
    });

    it('should delete a Guild', async function() {
      const foundGuild = await Guild.findOne({ where: { name: 'Monsters' } });
      const foundGuildId = foundGuild.id;
      const res = await chai.request(app).delete(`/api/guilds/${foundGuildId}`);

      expect(res).to.have.status(200);
      expect(res.body.success).to.equal('Guild deleted');
    });

    it('delete fails if Guild does not exist', async function() {
      const res = await chai.request(app).delete('/api/guilds/100');

      expect(res).to.have.status(404);
      expect(res.body.error).to.equal('Guild does not exist');
    });
  });
});
