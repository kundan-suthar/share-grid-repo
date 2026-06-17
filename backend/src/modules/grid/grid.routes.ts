import { Router } from 'express';
import { GridController } from './grid.controller.js';

const router = Router();
const controller = new GridController();

router.get('/', controller.getGrid);

export { router as gridRoutes };
