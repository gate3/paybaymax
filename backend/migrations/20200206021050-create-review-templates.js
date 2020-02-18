
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('review_templates', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    creatorId: {
      type: Sequelize.UUID,
    },
    content: {
      type: Sequelize.TEXT,
    },
    name: {
      type: Sequelize.STRING,
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('review_templates'),
};
