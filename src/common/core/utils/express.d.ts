import * as express from 'express';
declare global {
  namespace Express {
    interface Request {
      token_payload?: Record<string, any>;
    }
  }
}
