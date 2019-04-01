'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('EventStats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      member_id: {
        type: Sequelize.INTEGER
      },
      event_id: {
        type: Sequelize.INTEGER
      },
      guild_id: {
        type: Sequelize.INTEGER
      },
      guildPts: {
        type: Sequelize.BIGINT
      },
      position: {
        type: Sequelize.INTEGER
      },
      soloPts: {
        type: Sequelize.BIGINT
      },
      league_id: {
        type: Sequelize.INTEGER
      },
      soloRank: {
        type: Sequelize.INTEGER
      },
      globalRank: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('EventStats');
  }
};