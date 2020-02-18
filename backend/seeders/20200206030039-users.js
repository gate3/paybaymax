
const { ROLES } = require('../src/constants');

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('users', [
    {
      id: '3745d5e4-0f9e-4155-9bc3-af659d6c7501',
      username: 'adminuser',
      password: '$2a$10$YLB1si6DrSkPFhH1lDRPjOMWCIa68.UEXfMj6UHLVfCBVBa4as2fO',
      role: ROLES.ADMIN,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '0e080f58-1b12-4b57-b9f2-f95f0674253d',
      username: 'employeeuser',
      password: '$2a$10$YLB1si6DrSkPFhH1lDRPjOMWCIa68.UEXfMj6UHLVfCBVBa4as2fO',
      role: ROLES.EMPLOYEE,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null);
  },
};
