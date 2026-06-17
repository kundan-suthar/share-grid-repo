import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { env } from '../config/env.js';
import { logger } from '../config/logger.js';
import * as schema from './schema.js';

const postgresOptions: postgres.Options<Record<string, postgres.PostgresType>> = {
  max: 10,
  idle_timeout: 20,
  connect_timeout: 10,
};

if (env.DATABASE_URL.includes('sslmode=require')) {
  postgresOptions.ssl = 'require';
}

export const sqlClient = postgres(env.DATABASE_URL, postgresOptions);

export const db = drizzle(sqlClient, { schema });

export async function closeDatabase() {
  logger.info('Closing PostgreSQL connections');
  await sqlClient.end({ timeout: 5 });
}
