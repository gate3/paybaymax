/* eslint-disable func-names */
/* eslint-disable camelcase */
const { Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const review_templates = sequelize.define('review_templates', {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    creatorId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    content: DataTypes.TEXT,
    name: DataTypes.STRING,
  }, {});
  review_templates.associate = function (models) {
    // associations can be defined here
    review_templates.belongsTo(models.employees, {
      as: 'creator',
    });
    review_templates.hasOne(models.reviews, {
      foreignKey: 'reviewTemplateId',
    });
  };
  return review_templates;
};
