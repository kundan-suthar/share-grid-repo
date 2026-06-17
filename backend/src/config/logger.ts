import pino from 'pino';
import { env, isProduction } from './env.js';

const loggerOptions: pino.LoggerOptions = {
  level: env.LOG_LEVEL,
  redact: ['req.headers.authorization', 'DATABASE_URL', 'REDIS_URL'],
};

if (!isProduction) {
  loggerOptions.transport = {
    target: 'pino-pretty',
    options: {
      colorize: true,
      singleLine: true,
    },
  };
}

export const logger = pino(loggerOptions);
