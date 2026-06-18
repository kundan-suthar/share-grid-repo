import { redisPresence } from './redis.js';
import { logger } from '../config/logger.js';

const PRESENCE_KEY = 'pixel-territory:presence';

export class PresenceService {
  async add(socketId: string) {
    try {
      await redisPresence.sAdd(PRESENCE_KEY, socketId);
      return this.count();
    } catch (err) {
      logger.error({ err, socketId }, 'Presence add error');
      throw err;
    }
  }

  async remove(socketId: string) {
    try {
      await redisPresence.sRem(PRESENCE_KEY, socketId);
      return this.count();
    } catch (err) {
      logger.error({ err, socketId }, 'Presence remove error');
      throw err;
    }
  }

  async count() {
    try {
      return redisPresence.sCard(PRESENCE_KEY);
    } catch (err) {
      logger.error({ err }, 'Presence count error');
      throw err;
    }
  }

  async reset() {
    try {
      await redisPresence.del(PRESENCE_KEY);
      logger.info('Presence data reset');
    } catch (err) {
      logger.error({ err }, 'Presence reset error');
      throw err;
    }
  }
}
