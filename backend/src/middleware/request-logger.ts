import { pinoHttp } from 'pino-http';
import { randomUUID } from 'node:crypto';
import { logger } from '../config/logger.js';

export const requestLogger = pinoHttp({
  logger,
  genReqId: (req) => req.headers['x-request-id']?.toString() ?? randomUUID(),
});
