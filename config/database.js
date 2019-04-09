require('dotenv').config();

module.exports = {
  development: {
    'username': process.env.DB_DEV_USER,
    'password': process.env.DB_DEV_PASS,
    'database': process.env.DB_DEV_DATA,
    'host': '127.0.0.1',
    'dialect': process.env.DB_DIALECT,
    // 'logging': false
  },
  'test': {
    'username': process.env.DB_TEST_USER,
    'password': process.env.DB_TEST_PASS,
    'database': process.env.DB_TEST_DATA,
    'host': '127.0.0.1',
    'dialect': process.env.DB_DIALECT,
    'logging': false
  },
  'production': {
    'username': process.env.DB_USER,
    'password': process.env.DB_PASS,
    'database': process.env.DB_DATA,
    'host':  process.env.DB_HOST,
    'dialect': process.env.DB_DIALECT
  }
};
