/* eslint-disable func-names */

const { Sequelize } = require('sequelize');
const { ROLES } = require('../src/constants');

module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('user', {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM,
      values: Object.values(ROLES),
    },
  }, {});
  users.associate = function (models) {
    // associations can be defined here
    users.hasOne(models.employees);
  };
  return users;
};
