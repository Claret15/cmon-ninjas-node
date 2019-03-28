'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define(
    'Event',
    {
      name: DataTypes.STRING,
      date: DataTypes.DATEONLY
    },
    {}
  );
  Event.associate = function(models) {
    // associations can be defined here
    Event.belongsTo(models.EventType, {
      foreignKey: 'event_type_id',
      as: 'event_type'
    });
  };
  return Event;
};
