'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Leagues', [
      { name: 'Legends', 
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { name: 'Emperors', 
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { name: 'Kings', 
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { name: 'Paladins', 
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { name: 'Knights', 
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { name: 'Squires', 
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { name: 'Soldiers', 
        createdAt: new Date(), 
        updatedAt: new Date() 
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Leagues', null, {});
  }
};
