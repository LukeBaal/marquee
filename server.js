const path = require('path');
const express = require('express');
const morgan = require('morgan');
const { connectDB, sequelize } = require('./db');
const applications = require('./routes/applications');
const categories = require('./routes/categories');
const associateModels = require('./model/associateModels');

const getDockerContainers = require('./controllers/docker');

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (_req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

app.get('/', (_req, res) => res.status(200).json({ success: true, message: 'Hello'}));

app.use('/api/v1/applications', applications);
app.use('/api/v1/categories', categories);

(async () => {
  await connectDB();
  associateModels();
  await sequelize.sync();

  await getDockerContainers();

  const PORT = process.env.PORT || 5000;
  app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
  );
})();
