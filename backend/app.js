/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// Concept of loaders to help load any required external service or tool
const loaders = require('./src/loaders');

module.exports = async () => {
  const app = express();

  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());

  await loaders(app);

  return app;
};
