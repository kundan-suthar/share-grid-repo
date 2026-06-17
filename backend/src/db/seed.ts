import { sql } from 'drizzle-orm';
import { db, closeDatabase } from './client.js';
import { logger } from '../config/logger.js';

async function seedTiles() {
  logger.info('Seeding 30x30 grid tiles');

  await db.execute(sql`
    INSERT INTO tiles (id, x, y)
    SELECT (y * 30 + x + 1) AS id, x, y
    FROM generate_series(0, 29) AS x
    CROSS JOIN generate_series(0, 29) AS y
    ON CONFLICT (id) DO NOTHING
  `);

  logger.info('Tile seed complete');
}

seedTiles()
  .catch((error) => {
    logger.error({ error }, 'Tile seed failed');
    process.exitCode = 1;
  })
  .finally(async () => {
    await closeDatabase();
  });
