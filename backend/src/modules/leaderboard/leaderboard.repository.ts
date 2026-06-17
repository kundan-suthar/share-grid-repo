import { desc, sql } from 'drizzle-orm';
import { db } from '../../db/client.js';
import { tiles, users } from '../../db/schema.js';

export type LeaderboardEntry = {
  userId: string;
  username: string;
  color: string;
  tilesClaimed: number;
};

export class LeaderboardRepository {
  async getLeaderboard(limit = 20): Promise<LeaderboardEntry[]> {
    return db
      .select({
        userId: users.id,
        username: users.username,
        color: users.color,
        tilesClaimed: sql<number>`count(${tiles.id})::int`,
      })
      .from(users)
      .leftJoin(tiles, sql`${tiles.ownerId} = ${users.id}`)
      .groupBy(users.id, users.username, users.color)
      .orderBy(desc(sql`count(${tiles.id})`), users.createdAt)
      .limit(limit);
  }
}
