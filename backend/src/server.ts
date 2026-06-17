import { createServer } from 'node:http';
import { env } from './config/env.js';
import { logger } from './config/logger.js';
import { closeDatabase } from './db/client.js';
import { createApp } from './app.js';
import { connectRedis, closeRedis } from './sockets/redis.js';
import { createSocketGateway } from './sockets/gateway.js';

const app = createApp();
const httpServer = createServer(app);

await connectRedis();
const io = createSocketGateway(httpServer);

httpServer.listen(env.PORT, () => {
  logger.info({ port: env.PORT }, 'Pixel Territory API listening');
});

function closeHttpServer() {
  return new Promise<void>((resolve, reject) => {
    httpServer.close((error) => {
      if (error) {
        reject(error);
        return;
      }

      resolve();
    });
  });
}

async function shutdown(signal: NodeJS.Signals) {
  logger.info({ signal }, 'Graceful shutdown started');

  try {
    await closeHttpServer();
    await io.close();
    await closeRedis();
    await closeDatabase();
    logger.info('Graceful shutdown complete');
    process.exit(0);
  } catch (shutdownError) {
    logger.error({ error: shutdownError }, 'Graceful shutdown failed');
    process.exit(1);
  }
}

process.on('SIGTERM', () => void shutdown('SIGTERM'));
process.on('SIGINT', () => void shutdown('SIGINT'));

process.on('unhandledRejection', (reason) => {
  logger.fatal({ reason }, 'Unhandled promise rejection');
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  logger.fatal({ error }, 'Uncaught exception');
  process.exit(1);
});
