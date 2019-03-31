'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    // for (let i = 1; i <= 6; i++) {
    //   let stat = {
    //     member_id: i,
    //     event_id: DataTypes.INTEGER,
    //     guildPts: DataTypes.BIGINT,
    //     position: DataTypes.INTEGER,
    //     soloPts: DataTypes.BIGINT,
    //     league_id: DataTypes.INTEGER,
    //     soloRank: DataTypes.INTEGER,
    //     globalRank: DataTypes.INTEGER
    //   };
    // }

    return queryInterface.bulkInsert(
      'EventStats',
      [
        {
          member_id: 1,
          event_id: 1,
          guildPts: 123,
          position: 1,
          soloPts: 123456789,
          league_id: 1,
          soloRank: 1,
          globalRank: 100,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          member_id: 1,
          event_id: 2,
          guildPts: 123,
          position: 1,
          soloPts: 123456789,
          league_id: 1,
          soloRank: 1,
          globalRank: 100,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          member_id: 2,
          event_id: 1,
          guildPts: 123456,
          position: 1,
          soloPts: 9876,
          league_id: 2,
          soloRank: 10,
          globalRank: 1000,
          createdAt: new Date(),
          updatedAt: new Date()
        },

      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('EventStats', null, {});
  }
};
