'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Events', ['eventType_id'], {
      type: 'foreign key',
      name: 'fk_event_type',
      references: {
        table: 'EventTypes',
        field: 'id'
      },
      onUpdate: 'cascade'
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Events', 'fk_event_type');
  }
};
