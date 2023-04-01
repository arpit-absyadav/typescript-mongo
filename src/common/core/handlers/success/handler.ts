/* eslint-disable @typescript-eslint/no-unused-vars */
import { STATUS } from '../consts';
import Payload from '../payload';
import { Request, Response, NextFunction } from 'express';

const successHandler = (
  data: any,
  req: Request,
  res: Response,
  next: NextFunction,
): Response => {
  const payload = new Payload();
  const payloadData: any = payload.successPayload(data);
  return res.status(STATUS.OK).send(payloadData);
};

export default successHandler;
