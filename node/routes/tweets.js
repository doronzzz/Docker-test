const models = require('../models');
const express = require('express');
const Joi = require('joi');

module.exports = function (app) {
  const router = express.Router({ mergeParams: true });


  /**
   *  /tweets:
   *    get:
   *      description: get all tweets
   *      produces:
   *        - application/json
   *      responses:
   *        200:
   *           [
   *             {
   *             id: int,
   *             content: string,
   *             username: string,
   *             timestamp: iso formated string,
   *             likes_count: int
   *             retweets_count: int
   *             }
   *          ]
   */
  router.get('/', (req, res) => {
    const query = `SELECT
                    Tweets.id,
                    Tweets.content,
                    Tweets.username,
                    Tweets.timestamp,
                    (SELECT COUNT(*) FROM "Likes" WHERE "Likes".post_id = Tweets.id) AS "likes_count",
                    (SELECT COUNT(*) FROM "ReTweets" WHERE "ReTweets".post_id = Tweets.id) AS "retweets_count"
                  FROM "Tweets" AS Tweets`;

    models.sequelize.query(query, { type: models.sequelize.QueryTypes.SELECT }).then((results) => {
      res.json(results);
    }).catch((error) => {
      res.status(500).end(error.toString());
      console.log(`failed to findAll error :  ${error}`);
    });
  });


  /**
   *  /tweets:
   *    post:
   *      description: make a new tweet
   *      produces:
   *        - application/json
   *      parameters:
   *        - name: content
   *          description: tweet content.
   *          required: true
   *          type: string
   *        - name : username
   *          description: tweeter username
   *          required: true
   *          type: string
   *      responses:
   *        201:
   *
   */
  router.post('/', (req, res) => {
    const schema = {
      username: Joi.string().min(1).max(35).required(),
      content: Joi.string().min(1).max(280).required(),
    };

    Joi.validate({ username: req.body.username, content: req.body.content }, schema, (err, value) => {
      if (err) {
        res.status(400).end(err.toString());
      } else {
        models.Tweet.create({
          username: req.body.username,
          content: req.body.content,
        }).then(() => {
          res.status(201).send('ok');
        }).catch((error) => {
          res.status(400).end(error.toString());
          console.log(`failed to create error :  ${error}`);
        });
      }
    });
  });


  /**
   *  /tweets/:id/likes:
   *    post:
   *      description: like a tweet by id
   *      produces:
   *        - application/json
   *      parameters:
   *        - name: username
   *          description: liker username.
   *          required: true
   *          type: string
   *        - name : id
   *          description: tweet id to like
   *          required: true
   *          type: queryparam - int
   *      responses:
   *        201:
   */
  router.post('/:id/likes', (req, res) => {
    const schema = {
      username: Joi.string().min(1).max(35).required(),
    };

    Joi.validate({ username: req.body.username }, schema, (err, value) => {
      if (err) {
        res.status(400).end(err.toString());
      } else {
        models.Like.create({
          username: req.body.username,
          post_id: req.params.id,
        }).then(() => {
          res.status(201).send('ok');
        }).catch((error) => {
          res.status(400).end(error.toString());
          console.log(`failed to create like error :  ${error}`);
        });
      }
    });
  });


  /**
   *  /tweet/:id/retweet:
   *    post:
   *      description: retweet a tweet by id
   *      produces:
   *        - application/json
   *      parameters:
   *        - name: username
   *          description: retweeter username.
   *          required: true
   *          type: string
   *        - name : id
   *          description: tweet id to retweet
   *          required: true
   *          type: queryparam - int
   *      responses:
   *        201:
   */
  router.post('/:id/retweet', (req, res) => {
    const schema = {
      username: Joi.string().min(1).max(35).required(),
    };

    Joi.validate({ username: req.body.username }, schema, (err, value) => {
      if (err) {
        res.status(400).end(err.toString());
      } else {
        models.ReTweet.create({
          username: req.body.username,
          post_id: req.params.id,
        }).then(() => {
          res.status(201).send('ok');
        }).catch((error) => {
          res.status(400).end(error.toString());
          console.log(`failed to create error :  ${error}`);
        });
      }
    });
  });

  return router;
};
