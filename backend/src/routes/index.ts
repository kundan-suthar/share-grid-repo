import { Router } from 'express';
import { userRoutes } from '../modules/users/user.routes.js';
import { gridRoutes } from '../modules/grid/grid.routes.js';
import { leaderboardRoutes } from '../modules/leaderboard/leaderboard.routes.js';
import { statsRoutes } from '../modules/stats/stats.routes.js';
import { healthRoutes } from '../modules/health/health.routes.js';

const router = Router();

router.use('/users', userRoutes);
router.use('/grid', gridRoutes);
router.use('/leaderboard', leaderboardRoutes);
router.use('/stats', statsRoutes);
router.use('/health', healthRoutes);

export { router as apiRoutes };
