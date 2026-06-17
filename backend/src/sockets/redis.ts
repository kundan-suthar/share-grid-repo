import { createClient } from 'redis';
import { env } from '../config/env.js';
import { logger } from '../config/logger.js';

export const redisPublisher = createClient({ url: env.REDIS_URL });
export const redisSubscriber = redisPublisher.duplicate();
export const redisPresence = redisPublisher.duplicate();

export async function connectRedis() {
  // use `err` key so pino includes error message & stack
  redisPublisher.on('error', (error) => logger.error({ err: error }, 'Redis publisher error'));
  redisSubscriber.on('error', (error) => logger.error({ err: error }, 'Redis subscriber error'));
  redisPresence.on('error', (error) => logger.error({ err: error }, 'Redis presence error'));

  await Promise.all([redisPublisher.connect(), redisSubscriber.connect(), redisPresence.connect()]);
  logger.info('Connected to Redis');
}

export async function closeRedis() {
  logger.info('Closing Redis connections');
  await Promise.allSettled([redisPublisher.quit(), redisSubscriber.quit(), redisPresence.quit()]);
}
