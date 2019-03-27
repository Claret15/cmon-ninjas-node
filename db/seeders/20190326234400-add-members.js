'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Members',
      [
        {
          name: 'Claret',
          title: 'Council',
          createdAt: new Date(),
          updatedAt: new Date(),
          guild_id: 1
        },
        {
          name: 'Ruby',
          guild_id: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Mino',
          guild_id: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Tzar',
          guild_id: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Bruin',
          guild_id: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Sultan',
          guild_id: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Members', null, {});
  }
};
