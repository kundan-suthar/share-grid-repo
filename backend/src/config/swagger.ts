import type { Express } from 'express';
import swaggerUi from 'swagger-ui-express';

const openApiDocument = {
  openapi: '3.0.3',
  info: {
    title: 'Pixel Territory API',
    version: '1.0.0',
    description: 'REST and Socket.IO backend for a shared 30x30 multiplayer tile grid.',
  },
  servers: [{ url: '/api/v1' }],
  paths: {
    '/users': {
      post: {
        summary: 'Create guest user',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/CreateUserRequest' },
            },
          },
        },
        responses: {
          '201': {
            description: 'Created guest user',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/User' } } },
          },
        },
      },
    },
    '/grid': {
      get: {
        summary: 'Get full 30x30 grid',
        responses: {
          '200': {
            description: 'Grid tiles',
            content: {
              'application/json': {
                schema: { type: 'array', items: { $ref: '#/components/schemas/Tile' } },
              },
            },
          },
        },
      },
    },
    '/leaderboard': {
      get: {
        summary: 'Get leaderboard sorted by claimed tile count',
        responses: {
          '200': {
            description: 'Leaderboard',
            content: {
              'application/json': {
                schema: { type: 'array', items: { $ref: '#/components/schemas/LeaderboardEntry' } },
              },
            },
          },
        },
      },
    },
    '/stats': {
      get: {
        summary: 'Get game statistics',
        responses: {
          '200': {
            description: 'Stats',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Stats' } } },
          },
        },
      },
    },
    '/health': {
      get: {
        summary: 'Health check',
        responses: {
          '200': {
            description: 'Service health',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Health' } } },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      CreateUserRequest: {
        type: 'object',
        required: ['username'],
        properties: {
          username: { type: 'string', minLength: 2, maxLength: 24, example: 'pixelFan' },
        },
      },
      User: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          username: { type: 'string' },
          color: { type: 'string', example: '#4F46E5' },
          createdAt: { type: 'string', format: 'date-time' },
        },
      },
      Tile: {
        type: 'object',
        properties: {
          id: { type: 'integer', minimum: 1, maximum: 900 },
          x: { type: 'integer', minimum: 0, maximum: 29 },
          y: { type: 'integer', minimum: 0, maximum: 29 },
          ownerId: { type: 'string', nullable: true, format: 'uuid' },
          claimedAt: { type: 'string', nullable: true, format: 'date-time' },
        },
      },
      LeaderboardEntry: {
        type: 'object',
        properties: {
          userId: { type: 'string', format: 'uuid' },
          username: { type: 'string' },
          color: { type: 'string' },
          tilesClaimed: { type: 'integer' },
        },
      },
      Stats: {
        type: 'object',
        properties: {
          totalTiles: { type: 'integer' },
          claimedTiles: { type: 'integer' },
          unclaimedTiles: { type: 'integer' },
          activeUsers: { type: 'integer' },
        },
      },
      Health: {
        type: 'object',
        properties: {
          status: { type: 'string', example: 'ok' },
          uptime: { type: 'number' },
          timestamp: { type: 'string', format: 'date-time' },
        },
      },
    },
  },
};

export function setupSwagger(app: Express) {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(openApiDocument));
}
