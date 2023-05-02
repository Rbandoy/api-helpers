const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'subscription' },
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logger.log' })
  ]
});
 
module.exports = logger;