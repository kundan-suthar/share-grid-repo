import { index, integer, pgTable, text, timestamp, uniqueIndex, uuid } from 'drizzle-orm/pg-core';

export const users = pgTable(
  'users',
  {
    id: uuid('id').primaryKey(),
    username: text('username').notNull(),
    color: text('color').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    createdAtIdx: index('users_created_at_idx').on(table.createdAt),
  }),
);

export const tiles = pgTable(
  'tiles',
  {
    id: integer('id').primaryKey(),
    x: integer('x').notNull(),
    y: integer('y').notNull(),
    ownerId: uuid('owner_id').references(() => users.id, { onDelete: 'set null' }),
    claimedAt: timestamp('claimed_at', { withTimezone: true }),
  },
  (table) => ({
    xyUniqueIdx: uniqueIndex('tiles_xy_unique_idx').on(table.x, table.y),
    ownerIdIdx: index('tiles_owner_id_idx').on(table.ownerId),
  }),
);

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Tile = typeof tiles.$inferSelect;
