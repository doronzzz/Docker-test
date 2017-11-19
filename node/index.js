const express = require('express');
const bodyParser = require('body-parser');
const models = require('./models');

const app = express();
const port = process.env.APP_PORT || 3000;
const TIMEOUT_MILS = process.env.TIMEOUT_MILS || 2500;

// Setting up req parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Load all Routes
const routes = require('./routes')(app);

const startServer = () => {
  console.log('DB Synced');
  console.log(`Starting Express server on port: ${port}`);
  app.listen(port);
};

const connectToDB = () => models.sequelize.sync({ force: true })
  .then(startServer)
  .catch((error) => {
    console.error(error);
    console.log(`Failed to connecto to DB retry in: ${TIMEOUT_MILS} Milisecs`);
    setTimeout(connectToDB, TIMEOUT_MILS);
  });

// connect to DB only then start the server
connectToDB();
