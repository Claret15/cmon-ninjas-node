'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return (
      queryInterface.addColumn(
        'Events',
        'event_type_id',
        Sequelize.INTEGER
      ),

      queryInterface.addConstraint('Events', ['event_type_id'], {
        type: 'foreign key',
        name: 'fk_event_eventtype',
        references: {
          table: 'EventTypes',
          field: 'id'
        },
        onUpdate: 'cascade'
      })

    );

  },

  down: (queryInterface, Sequelize) => {
    return (
      queryInterface.removeConstraint('Events', 'fk_event_eventtype'),
      queryInterface.removeColumn('Events', 'event_type_id')
    );

  }
};
