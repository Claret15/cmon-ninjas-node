'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return (
      queryInterface.addConstraint('EventStats', ['event_id'], {
        type: 'foreign key',
        name: 'fk_stat_event',
        references: {
          table: 'Events',
          field: 'id'
        },
        onUpdate: 'cascade'
      }),
      queryInterface.addConstraint('EventStats', ['member_id'], {
        type: 'foreign key',
        name: 'fk_stat_member',
        references: {
          table: 'Members',
          field: 'id'
        },
        onUpdate: 'cascade'
      }),
      queryInterface.addConstraint('EventStats', ['league_id'], {
        type: 'foreign key',
        name: 'fk_stat_league',
        references: {
          table: 'Leagues',
          field: 'id'
        },
        onUpdate: 'cascade'
      })
    );
  },

  down: (queryInterface, Sequelize) => {
    return (
      queryInterface.removeConstraint('EventStats', 'fk_stat_event'),
      queryInterface.removeConstraint('EventStats', 'fk_stat_member'),
      queryInterface.removeConstraint('EventStats', 'fk_stat_league')
    );
  }
};
