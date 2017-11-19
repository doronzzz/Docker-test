const express = require('express');

module.exports = function (app) {
  const router = express.Router({ mergeParams: true });
  app.get('/', (req, res) => {
    res.send('Hello NodeJS API');
  });
  app.use('/tweets', require('./tweets')(app));
  app.use('/retweets', require('./retweets')(app));
  return router;
};
