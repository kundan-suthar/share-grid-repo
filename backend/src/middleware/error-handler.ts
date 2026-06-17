import type { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { logger } from '../config/logger.js';
import { isProduction } from '../config/env.js';
import { HttpError } from '../utils/http-error.js';

export const errorHandler: ErrorRequestHandler = (error, req, res, _next) => {
  if (error instanceof HttpError) {
    res.status(error.statusCode).json({
      error: {
        message: error.message,
        details: error.details,
      },
    });
    return;
  }

  if (error instanceof ZodError) {
    res.status(400).json({
      error: {
        message: 'Validation failed',
        details: error.flatten(),
      },
    });
    return;
  }

  logger.error({ error, reqId: req.id }, 'Unhandled request error');

  res.status(500).json({
    error: {
      message: 'Internal server error',
      details: isProduction ? undefined : String(error),
    },
  });
};
