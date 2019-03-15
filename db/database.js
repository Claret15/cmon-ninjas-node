// Database connection
require('dotenv').config();
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/database.js')[env];

// View environment and config settings
console.log(env);
console.log(config);


const sequelize = new Sequelize(config.database, config.username, config.password, config, {
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});

module.exports = sequelize;