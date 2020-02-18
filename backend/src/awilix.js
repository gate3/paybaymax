const awilix = require('awilix');

const container = awilix.createContainer();

container.loadModules([
  [
    './**/*.model.js',
    {
      register: awilix.asValue,
      lifetime: awilix.Lifetime.SINGLETON,
    },
  ],
  [
    './**/*.helper.js',
    {
      // register: awilix.asClass,
      lifetime: awilix.Lifetime.SINGLETON,
    },
  ],
  [
    './**/*.service.js',
    {
      // register: awilix.asClass,
      lifetime: awilix.Lifetime.SINGLETON,
    },
  ],
  [
    './**/*.validator.js',
    {
      // register: awilix.asClass,
      lifetime: awilix.Lifetime.SINGLETON,
    },
  ],
],
{
  cwd: __dirname,
  formatName: 'camelCase',
});

const encryptionHelper = require('bcryptjs');
const CONSTANTS = require('./constants');

container.register({
  CONSTANTS: awilix.asValue(CONSTANTS),
  encryptionHelper: awilix.asValue(encryptionHelper),
});

module.exports = {
  Container: container,
};
