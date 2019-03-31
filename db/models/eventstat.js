'use strict';
module.exports = (sequelize, DataTypes) => {
  const EventStat = sequelize.define(
    'EventStat',
    {
      member_id: DataTypes.INTEGER,
      event_id: DataTypes.INTEGER,
      guildPts: DataTypes.BIGINT,
      position: DataTypes.INTEGER,
      soloPts: DataTypes.BIGINT,
      league_id: DataTypes.INTEGER,
      soloRank: DataTypes.INTEGER,
      globalRank: DataTypes.INTEGER
    },
    {}
  );
  EventStat.associate = function(models) {
    // associations can be defined here
    EventStat.belongsTo(models.Member, {
      foreignKey: 'member_id',
      as: 'member'
    });
    EventStat.belongsTo(models.Event, {
      foreignKey: 'event_id',
      as: 'event'
    });
    EventStat.belongsTo(models.League, {
      foreignKey: 'league_id',
      as: 'league'
    });
  };
  return EventStat;
};
