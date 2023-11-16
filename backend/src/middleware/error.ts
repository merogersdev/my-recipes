import { ErrorRequestHandler, RequestHandler } from 'express';
import createError from 'http-errors';
import { z } from 'zod';

// Handle Express Errors
const errorHandler: ErrorRequestHandler = (error, _req, res, next) => {
  const statusCode = error.statusCode || 500;
  const statusMessage = error.message || 'Unexpected Error';
  const stack = process.env.NODE_ENV === 'production' ? null : error.stack;

  // Return Zod Error
  if (error instanceof z.ZodError) {
    return res.status(400).json({
      message: 'Validation Error',
      error: error.flatten(),
    });
  }

  if (res.headersSent) {
    return next(error);
  }

  // Return Normal Error
  return res.status(statusCode).json({
    message: statusMessage,
    stack,
  });
};

// Handle Endpoint Not Found
export const notFoundHandler: RequestHandler = (_req, _res, next) => next(createError(404, 'Endpoint not found'));

export default errorHandler;
