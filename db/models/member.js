'use strict';
module.exports = (sequelize, DataTypes) => {
  const Member = sequelize.define(
    'Member',
    {
      name: DataTypes.STRING,
      guild_id: DataTypes.INTEGER,
      title: DataTypes.STRING,
      isActive: DataTypes.BOOLEAN
    },
    {}
  );
  Member.associate = function(models) {
    // associations can be defined here
    Member.belongsTo(models.Guild, {
      foreignKey: 'guild_id',
      as: 'guild'
    });
  };
  return Member;
};
