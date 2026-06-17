import { randomUUID } from 'node:crypto';
import { randomColor } from '../../utils/random-color.js';
import type { CreateUserInput } from './user.validation.js';
import { UserRepository } from './user.repository.js';

export class UserService {
  constructor(private readonly userRepository = new UserRepository()) {}

  async createGuestUser(input: CreateUserInput) {
    return this.userRepository.create({
      id: randomUUID(),
      username: input.username,
      color: randomColor(),
    });
  }
}
