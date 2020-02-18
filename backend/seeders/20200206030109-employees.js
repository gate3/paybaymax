/**
 * Sequelize uses this library under the hood and as such is already available
  * But Just in case I included the library in the dependencies
 * */
const uuid = require('uuid/v4');

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('employees', [
    {
      id: uuid(),
      firstName: 'Tayo',
      lastName: 'Olarewaju',
      email: 'olarewaju@gmail.com',
      userId: '3745d5e4-0f9e-4155-9bc3-af659d6c7501',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: uuid(),
      firstName: 'Doyin',
      lastName: 'Olarewaju',
      email: 'doyin@gmail.com',
      userId: '0e080f58-1b12-4b57-b9f2-f95f0674253d',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ], {}),
  down: (queryInterface, Sequelize) => {

  },
};
