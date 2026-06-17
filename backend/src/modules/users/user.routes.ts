import { Router } from 'express';
import { validate } from '../../middleware/validate.js';
import { UserController } from './user.controller.js';
import { createUserSchema } from './user.validation.js';

const router = Router();
const controller = new UserController();

router.post('/', validate(createUserSchema), controller.create);

export { router as userRoutes };
