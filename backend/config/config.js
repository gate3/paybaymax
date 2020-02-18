require('dotenv').config();

const {
  MYSQL_USERNAME, MYSQL_PASSWORD, MYSQL_DB_NAME,
  MYSQL_PORT, MYSQL_HOST,
} = process.env;

const baseConfig = {
  username: MYSQL_USERNAME,
  password: MYSQL_PASSWORD,
  database: MYSQL_DB_NAME,
  host: MYSQL_HOST,
  port: MYSQL_PORT,
  dialect: 'mysql',
};

Object.freeze(baseConfig);

module.exports = {
  development: baseConfig,
  test: {
    ...baseConfig,
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  production: baseConfig,
};
