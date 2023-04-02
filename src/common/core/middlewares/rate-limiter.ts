import { ERROR } from '../handlers/consts/error';
import { RateLimiterMemory } from 'rate-limiter-flexible';
import { Request, Response, NextFunction } from 'express';
import { HttpException } from '../handlers/error/HttpException';
import { error } from '../handlers';

interface RateLimitOptions {
  points: number;
  duration: number;
  message?: string;
}

const RateLimitor = (options: RateLimitOptions): any => {
  const rateLimiter = new RateLimiterMemory({
    points: options.points,
    duration: options.duration,
  });

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const key = req.ip; // assuming Express request object
      await rateLimiter.consume(key);
      next();
    } catch (_) {
      const message = options.message || 'Too many requests, please try again later.';
      const err = new HttpException(ERROR.TOO_MANY_REQUESTS, message);

      error.handler(err, req, res, next);
    }
  };
};

export default RateLimitor;
