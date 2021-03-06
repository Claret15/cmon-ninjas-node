'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Events',
      [
        {
          name: 'The First Dragoon',
          eventType_id: 2,
          date: '2018-10-11',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'The Arena',
          eventType_id: 3,
          date: '2018-10-18',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Fennec Fright Fest',
          eventType_id: 1,
          date: '2018-10-25',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Events', null, {});
  }
};
