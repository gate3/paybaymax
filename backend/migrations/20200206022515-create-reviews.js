
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('reviews', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    reviewerId: {
      type: Sequelize.UUID,
    },
    assignedById: {
      type: Sequelize.UUID,
    },
    content: {
      type: Sequelize.TEXT,
    },
    reviewAnswered: {
      type: Sequelize.BOOLEAN,
    },
    reviewTemplateId: {
      type: Sequelize.UUID,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('reviews'),
};
