import { z } from 'zod';

export const captureTileSchema = z.object({
  userId: z.string().uuid(),
  tileId: z.number().int().min(1).max(900),
});

export type CaptureTileInput = z.infer<typeof captureTileSchema>;
