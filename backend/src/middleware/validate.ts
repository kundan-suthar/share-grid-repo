import type { NextFunction, Request, Response } from 'express';
import type { ZodSchema } from 'zod';
import { HttpError } from '../utils/http-error.js';

type RequestPart = 'body' | 'params' | 'query';

type MutableRequestParts = Request & Record<RequestPart, unknown>;

export function validate(schema: ZodSchema<unknown>, part: RequestPart = 'body') {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[part]);

    if (!result.success) {
      next(new HttpError(400, 'Validation failed', result.error.flatten()));
      return;
    }

    (req as MutableRequestParts)[part] = result.data;
    next();
  };
}
