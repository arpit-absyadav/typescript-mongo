/* eslint-disable @typescript-eslint/no-unused-vars */
import HttpException from './HttpException';
import Payload from '../payload';
import { Request, Response, NextFunction } from 'express';

/**
 * handle exceptions and send appropriate response
 * @param err
 * @param _req
 * @param res
 * @returns {*}
 */
const errorHandler = (err: HttpException, _req: Request, res: Response, _next: NextFunction): Response => {
  const payload = new Payload();
  const payloadData: any = payload.errorPayload(err);
  console.error(JSON.stringify(payloadData, null, 2));
  return res.status(payloadData.error.code).send(payloadData);
};

export default errorHandler;
