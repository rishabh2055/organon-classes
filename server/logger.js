'use strict';

import { createLogger, format, transports } from 'winston';

export const { error, info, debug } = createLogger({
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.json(),
    format.colorize({ all: true }),
    format.simple()
  ),
  transports: [
    new transports.Console({'timestamp':true}),
    new transports.File({ filename: 'error.log', level: 'error' })
  ]
});
