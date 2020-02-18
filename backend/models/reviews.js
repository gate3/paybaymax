/* eslint-disable func-names */
const { Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const reviews = sequelize.define('reviews', {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    reviewerId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    assignedById: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    content: DataTypes.TEXT,
    reviewAnswered: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
    },
    reviewTemplateId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  }, {});
  reviews.associate = function (models) {
    // associations can be defined here
    reviews.belongsTo(models.employees, {
      as: 'reviewer',
    });
    reviews.belongsTo(models.employees, {
      as: 'assignedBy',
    });
    reviews.belongsTo(models.review_templates, {
      as: 'reviewTemplate',
    });
  };
  return reviews;
};
