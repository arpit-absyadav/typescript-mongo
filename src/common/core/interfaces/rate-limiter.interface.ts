import { Request } from 'express';

export interface RateLimitOptions {
  windowMs: number;
  maxRequests: number;
}

export interface RateLimitRequest extends Request {
  rateLimit: {
    windowMs: number;
    maxRequests: number;
    remaining: number;
    resetTime: number;
  };
}
