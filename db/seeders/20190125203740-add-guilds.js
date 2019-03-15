'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
      
      Example:
     */
    return queryInterface.bulkInsert('Guilds', [
      { name: 'Ninjas', 
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { name: 'Assassins', 
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { name: 'Destroyers', 
        createdAt: new Date(), 
        updatedAt: new Date() 
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete('Guilds', null, {});
  }
};
