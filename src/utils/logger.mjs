import {createLogger, transports, format} from 'winston';

export const logger = createLogger({
    level: 'info',
    format: format.simple(),
    defaultMeta: { service: 'user-service' },
    transports: [
      new transports.Console(),
      new transports.File({ filename: './logs/connect4.log' }),
    ],
  });