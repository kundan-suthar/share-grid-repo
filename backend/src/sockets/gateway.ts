import { Server } from 'socket.io';
import type { Server as HttpServer } from 'node:http';
import { env } from '../config/env.js';
import { logger } from '../config/logger.js';
import { GridService } from '../modules/grid/grid.service.js';
import { captureTileSchema } from '../modules/grid/tile.validation.js';
import { LeaderboardService } from '../modules/leaderboard/leaderboard.service.js';
import { setupRedisAdapter } from './adapter.js';
import { PresenceService } from './presence.service.js';
import type {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from './types.js';

export type PixelSocketServer = Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;

export function createSocketGateway(httpServer: HttpServer) {
  const io: PixelSocketServer = new Server(httpServer, {
    cors: {
      origin: env.CORS_ORIGIN,
      methods: ['GET', 'POST'],
    },
  });

  setupRedisAdapter(io);

  const gridService = new GridService();
  const leaderboardService = new LeaderboardService();
  const presenceService = new PresenceService();

  io.on('connection', async (socket) => {
    logger.info({ socketId: socket.id }, 'Socket connected');
    const onlineUsers = await presenceService.add(socket.id);
    io.emit('presence:update', { onlineUsers });

    socket.on('tile:capture', async (payload) => {
      const result = captureTileSchema.safeParse(payload);

      if (!result.success) {
        socket.emit('tile:capture_failed', {
          tileId: Number(payload?.tileId ?? 0),
          reason: 'Invalid capture request',
        });
        return;
      }

      const tile = await gridService.captureTile(result.data);

      if (!tile) {
        socket.emit('tile:capture_failed', {
          tileId: result.data.tileId,
          reason: 'Tile is already claimed',
        });
        return;
      }

      io.emit('tile:updated', tile);
      io.emit('leaderboard:update', await leaderboardService.getLeaderboard());
    });

    socket.on('disconnect', async () => {
      logger.info({ socketId: socket.id }, 'Socket disconnected');
      const remainingUsers = await presenceService.remove(socket.id);
      io.emit('presence:update', { onlineUsers: remainingUsers });
    });
  });

  return io;
}
