const winston = require('winston');
const mongoose = require('mongoose'); // for MongoDB
const config = require('config');

module.exports = function () {
  const db = config.get('db');
  mongoose
    .connect(db, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => winston.info(`Connected to ${db}...`));
};
