import type { Request, Response } from 'express';
import { asyncHandler } from '../../utils/async-handler.js';
import { db } from '../../db/client.js';
import { sql } from 'drizzle-orm';

export class HealthController {
  getHealth = asyncHandler(async (_req: Request, res: Response) => {
    await db.execute(sql`SELECT 1`);

    res.status(200).json({
      status: 'ok',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    });
  });
}
