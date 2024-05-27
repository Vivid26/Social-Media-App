import winston from "winston";

export const logger = winston.createLogger({

  level: 'error',
  format: winston.format.json(),
  defaultMeta: {service: 'request-logging'},
  transports: [
    new winston.transports.File({filename:'error.log'})
  ]
});
