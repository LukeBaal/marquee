const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');
const { v4 } = require('uuid');
const uuidv4 = v4;

const Category= sequelize.define('Category', {
  id: {
    type: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
    defaultValue: uuidv4()
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  icon: {
    type: DataTypes.STRING,
    allowNull: true
  },
  iconType: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'local'
  }
}, {
  tableName: 'categories'
});

module.exports = Category;