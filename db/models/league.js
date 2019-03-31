'use strict';
module.exports = (sequelize, DataTypes) => {
  const League = sequelize.define(
    'League',
    {
      name: DataTypes.STRING
    },
    {}
  );
  League.associate = function(models) {
    // associations can be defined here
    League.hasMany(models.EventStat, {
      foreignKey: 'league_id',
      as: 'league'
    });
  };
  return League;
};
