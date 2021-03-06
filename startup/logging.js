const config = require('config');
const winston = require('winston'); // for error logging. Default is enough for small/med apps
require('winston-mongodb'); // MongoDB transport for winston
require('express-async-errors'); // for error handling of express async errors for route handlers

module.exports = function () {
  winston.exceptions.handle(
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: 'uncaughtExceptions.log' })
  );

  process.on('unhandledRejection', (ex) => {
    throw ex;
  });

  // Below code will be valid once winston.rejections becomes valid again
  // and above code will have to be removed.
  // winston.rejections.handle(
  //   new winston.transports.File({ filename: 'unhandledRejections.log' })
  // );

  winston.add(new winston.transports.File({ filename: 'logfile.log' }));
  winston.add(
    new winston.transports.MongoDB({
      db: config.get('db'),
      level: 'info', // includes error, warn and info
      options: {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      },
    })
  );
  winston.add(new winston.transports.Console());
};
