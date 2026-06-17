import { eq, sql } from 'drizzle-orm';
import { db } from '../../db/client.js';
import { tiles, type Tile } from '../../db/schema.js';

export class TileRepository {
  async findAll(): Promise<Tile[]> {
    return db.select().from(tiles).orderBy(tiles.id);
  }

  async captureTile(tileId: number, userId: string): Promise<Tile | null> {
    const rows = await db.execute<Tile>(sql`
      UPDATE tiles
      SET owner_id = ${userId},
          claimed_at = NOW()
      WHERE id = ${tileId}
        AND owner_id IS NULL
      RETURNING
        id,
        x,
        y,
        owner_id AS "ownerId",
        claimed_at AS "claimedAt"
    `);

    return rows[0] ?? null;
  }

  async countClaimed(): Promise<number> {
    const [row] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(tiles)
      .where(sql`${tiles.ownerId} IS NOT NULL`);

    return row?.count ?? 0;
  }

  async resetTileOwners(): Promise<void> {
    await db.update(tiles).set({ ownerId: null, claimedAt: null }).where(eq(tiles.id, tiles.id));
  }
}
