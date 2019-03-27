'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'EventTypes',
      [
        {
          name: 'Raid',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Crusade',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Arena',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('EventTypes', null, {});
  }
};
