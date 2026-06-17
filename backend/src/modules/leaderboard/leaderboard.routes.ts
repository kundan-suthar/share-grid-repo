import { Router } from 'express';
import { LeaderboardController } from './leaderboard.controller.js';

const router = Router();
const controller = new LeaderboardController();

router.get('/', controller.getLeaderboard);

export { router as leaderboardRoutes };
