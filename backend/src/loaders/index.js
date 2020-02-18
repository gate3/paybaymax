// const dbLoader = require('./dbLoader');
const awilix = require('awilix');

const models = require('../../models');
const { Container } = require('../awilix');
const expressRoutes = require('../api');

const Logger = Container.resolve('loggingHelper');

module.exports = async (app) => {
  // Load app routes
  expressRoutes(app);
  // Register all required helpers in the IoC container
  Container.register({
    models: awilix.asValue(models),
  });
  Logger.info('✌️ DB loaded and connected!');
};
