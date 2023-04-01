require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    dialectOptions: {
       useUTC: true,
    }
  },
  test: {
    username: 'root',
    password: null,
    database: 'merklefariztest',
    host: '127.0.0.1',
    dialect: 'mysql',
    dialectOptions: {
      useUTC: true,
    }
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    dialectOptions: {
      useUTC: true,
    }
  },
};
