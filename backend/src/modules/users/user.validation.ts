import { z } from 'zod';

export const createUserSchema = z.object({
  username: z
    .string()
    .trim()
    .min(2, 'Username must be at least 2 characters')
    .max(24, 'Username must be at most 24 characters')
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      'Username may only contain letters, numbers, underscores, and dashes',
    ),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
