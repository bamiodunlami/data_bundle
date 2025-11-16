import logger from '#util/logger';

//error class
export class appError extends Error {
  constructor(statusCode, message, code) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    this.code = code;
  }
}

//async handler
export function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

//global error handleer
export function globalErrorHandler(err, req, res, next) {
  let loglevel = 'info';
  if (err instanceof TypeError) {
    loglevel = 'error';
    err.statusCode = 500;
  }

  if (err.code === '23505') {
    console.log(err.statusCode);
    loglevel = 'info';
    err.statusCode = 409;
    err.message = 'User already exists';
  }

  logger.log({
    level: loglevel,
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
  });

  return res.status(err.statusCode || 500).send({
    succes: false,
    message: err.statusCode >= 500 ? 'Internal server error' : err.message,
  });
}
