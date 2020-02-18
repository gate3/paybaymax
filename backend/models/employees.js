/* eslint-disable func-names */
const { Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const employees = sequelize.define('employees', {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {});
  employees.associate = function (models) {
    // associations can be defined here
    employees.hasOne(models.review_templates, {
      foreignKey: 'creatorId',
    });
    employees.hasOne(models.reviews, {
      foreignKey: 'reviewerId',
    });
    employees.hasOne(models.reviews, {
      foreignKey: 'assignedById',
    });
    employees.belongsTo(models.user, {
      as: 'user',
    });
  };
  return employees;
};
