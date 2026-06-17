import { sql } from 'drizzle-orm';
import { db } from '../../db/client.js';
import { tiles, users } from '../../db/schema.js';

export type Stats = {
  totalTiles: number;
  claimedTiles: number;
  unclaimedTiles: number;
  activeUsers: number;
};

export class StatsRepository {
  async getStats(): Promise<Stats> {
    const [tileStats] = await db
      .select({
        totalTiles: sql<number>`count(*)::int`,
        claimedTiles: sql<number>`count(${tiles.ownerId})::int`,
      })
      .from(tiles);

    const [userStats] = await db.select({ activeUsers: sql<number>`count(*)::int` }).from(users);

    const totalTiles = tileStats?.totalTiles ?? 0;
    const claimedTiles = tileStats?.claimedTiles ?? 0;

    return {
      totalTiles,
      claimedTiles,
      unclaimedTiles: totalTiles - claimedTiles,
      activeUsers: userStats?.activeUsers ?? 0,
    };
  }
}
