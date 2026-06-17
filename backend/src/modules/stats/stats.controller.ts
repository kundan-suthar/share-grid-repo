import type { Request, Response } from 'express';
import { asyncHandler } from '../../utils/async-handler.js';
import { StatsService } from './stats.service.js';

export class StatsController {
  constructor(private readonly statsService = new StatsService()) {}

  getStats = asyncHandler(async (_req: Request, res: Response) => {
    const stats = await this.statsService.getStats();
    res.status(200).json(stats);
  });
}
