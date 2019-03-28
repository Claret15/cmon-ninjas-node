'use strict';
module.exports = (sequelize, DataTypes) => {
  const EventType = sequelize.define(
    'EventType',
    {
      name: DataTypes.STRING
    },
    {}
  );
  EventType.associate = function(models) {
    // associations can be defined here
    EventType.hasMany(models.Event, {
      foreignKey: 'event_type_id',
      as: 'events'
    });
  };
  return EventType;
};
