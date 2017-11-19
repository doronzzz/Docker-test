FROM node:6.12.0-alpine

ENV APP_PATH /home/node/app

COPY ./models                 $APP_PATH/models
COPY ./routes                 $APP_PATH/routes
COPY ./index.js               $APP_PATH
COPY ./package.json           $APP_PATH

WORKDIR $APP_PATH

RUN npm install --quiet

CMD npm start

EXPOSE 3000
