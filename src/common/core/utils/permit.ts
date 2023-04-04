import { ERROR } from './../handlers/consts/error';
import { HttpException } from './../handlers/error/HttpException';
import { Request, Response, NextFunction } from 'express';

const permit = function (allowedRoles: Array<string>) {
  return async function (req: Request, res: Response, next: NextFunction): Promise<any> {
    const payload = req['token_payload'];
    if (allowedRoles.includes(payload['role'])) {
      next();
    } else {
      next(new HttpException(ERROR.FORBIDDEN, 'Access Forbidden'));
    }
  };
};
export default permit;
