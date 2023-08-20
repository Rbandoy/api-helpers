const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(), // Add timestamp to logs
    winston.format.printf(({ level, message, timestamp }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    }),
  ),
  defaultMeta: { service: 'subscription' },
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logger.log' }),
  ],
});

module.exports = logger;
