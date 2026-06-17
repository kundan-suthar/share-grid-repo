import type { Server } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { redisPublisher, redisSubscriber } from './redis.js';
import type {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from './types.js';

export function setupRedisAdapter(
  io: Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>,
) {
  io.adapter(createAdapter(redisPublisher, redisSubscriber));
}
