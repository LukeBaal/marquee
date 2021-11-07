const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './marquee.db'
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('DB Connected');
  } catch (err) {
    console.error('Unable to connect to the database: ', err);
  }
}

module.exports = {
  connectDB,
  sequelize
};