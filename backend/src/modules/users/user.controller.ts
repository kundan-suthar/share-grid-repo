import type { Request, Response } from 'express';
import { asyncHandler } from '../../utils/async-handler.js';
import type { CreateUserInput } from './user.validation.js';
import { UserService } from './user.service.js';

export class UserController {
  constructor(private readonly userService = new UserService()) {}

  create = asyncHandler(async (req: Request<unknown, unknown, CreateUserInput>, res: Response) => {
    const user = await this.userService.createGuestUser(req.body);
    res.status(201).json(user);
  });
}
