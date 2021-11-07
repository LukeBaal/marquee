const { DataTypes } = require('sequelize');
const Application = require('./Application');
const Category = require('./Category');

const associateModels = () => {
  Category.hasMany(Application, {
    foreignKey: {
      type: DataTypes.UUIDV4
    }
  });
  Application.belongsTo(Category);
}

module.exports = associateModels;