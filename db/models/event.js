'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define(
    'Event',
    {
      name: DataTypes.STRING,
      date: DataTypes.DATEONLY,
      eventType_id: DataTypes.INTEGER
    },
    {}
  );
  Event.associate = function(models) {
    // associations can be defined here
    Event.belongsTo(models.EventType, {
      foreignKey: 'eventType_id',
      as: 'event_type'
    });
    Event.hasMany(models.EventStat, {
      foreignKey: 'event_id',
      as: 'event'
    });
  };
  return Event;
};
