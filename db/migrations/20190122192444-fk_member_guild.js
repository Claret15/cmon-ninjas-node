'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return (
      queryInterface.addColumn(
        'Members',
        'guild_id',
        Sequelize.INTEGER
      ),

      queryInterface.addConstraint('Members', ['guild_id'], {
        type: 'foreign key',
        name: 'fk_member_guild',
        references: {
          table: 'Guilds',
          field: 'id'
        },
        onUpdate: 'cascade'
      })

    );

  },

  down: (queryInterface, Sequelize) => {
    return (
      queryInterface.removeConstraint('Members', 'fk_member_guild'),
      queryInterface.removeColumn('Members', 'guild_id')
    );

  }
};