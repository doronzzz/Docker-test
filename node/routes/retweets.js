const models = require('../models');
const express = require('express');

module.exports = function (app) {
  const router = express.Router({ mergeParams: true });

  /**
   *  /retweets:
   *    get:
   *      description: Get a list of retweets
   *      produces:
   *        - application/json
   *             [{
   *                content: string
   *                retweet_user: string
   *                tweet_id: int
   *                tweet_user: string
   *                timestamp: string
   *              }]
   *      responses:
   *        200:
   *          description: retweets []
   */
  router.get('/', (req, res) => {
    const query = {
      include: [
        {
          model: models.Tweet,
          attributes: [],
        },
      ],
      attributes: {
        include: [
          [models.Sequelize.col('Tweet.content'), 'content'],
          ['username', 'retweet_user'],
          [models.Sequelize.col('Tweet.id'), 'tweet_id'],
          [models.Sequelize.col('Tweet.username'), 'tweet_user'],
          'timestamp',
        ],
        exclude: ['post_id', 'id', 'updatedAt', 'username'],
      },
    };

    models.ReTweet.findAll(query).then((items) => {
      res.json(items);
    }).catch((error) => {
      res.status(500).end(error.toString());
      console.log(`failed to create error :  ${error}`);
    });
  });

  return router;
};
