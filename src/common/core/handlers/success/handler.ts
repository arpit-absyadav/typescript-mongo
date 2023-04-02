/* eslint-disable @typescript-eslint/no-unused-vars */
import { RESPONSE_CODE } from '../consts';
import Payload from '../payload';
import { Request, Response, NextFunction } from 'express';

const successHandler = (data: any, req: Request, res: Response, next: NextFunction): Response => {
  const payload = new Payload();
  const payloadData: any = payload.successPayload(data);
  return res.status(RESPONSE_CODE.OK).send(payloadData);
};

export default successHandler;
