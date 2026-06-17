import { db } from '../../db/client.js';
import { users, type NewUser, type User } from '../../db/schema.js';

export class UserRepository {
  async create(user: NewUser): Promise<User> {
    const [created] = await db.insert(users).values(user).returning();

    if (!created) {
      throw new Error('Failed to create user');
    }

    return created;
  }
}
