'use strict';
module.exports = (sequelize, DataTypes) => {
  const Guild = sequelize.define('Guild', {
    name: DataTypes.STRING
  }, {});
  Guild.associate = function(models) {
    // associations can be defined here
    Guild.hasMany(models.Member, {
      foreignKey: 'guild_id',
      as: 'members',
    });
    Guild.hasMany(models.EventStat, {
      foreignKey: 'guild_id',
      as: 'eventStats',
    });
  };
  return Guild;
};