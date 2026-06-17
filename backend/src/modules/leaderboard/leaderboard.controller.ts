import type { Request, Response } from 'express';
import { asyncHandler } from '../../utils/async-handler.js';
import { LeaderboardService } from './leaderboard.service.js';

export class LeaderboardController {
  constructor(private readonly leaderboardService = new LeaderboardService()) {}

  getLeaderboard = asyncHandler(async (_req: Request, res: Response) => {
    const leaderboard = await this.leaderboardService.getLeaderboard();
    res.status(200).json(leaderboard);
  });
}
