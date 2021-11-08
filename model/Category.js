const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const Category= sequelize.define('Category', {
  id: {
    type: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true
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