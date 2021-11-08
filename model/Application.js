const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const Application = sequelize.define('Application', {
  id: {
    type: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  icon: {
    type: DataTypes.STRING,
    allowNull: true
  },
  iconType: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'local'
  },
  tag: {
    type: DataTypes.STRING,
    allowNull: true
  },
  active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  hidden: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}, {
  tableName: 'applications'
});

module.exports = Application;