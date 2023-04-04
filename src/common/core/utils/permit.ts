import { error } from '../handlers';
import { ERROR } from './../handlers/consts/error';
import { HttpException } from './../handlers/error/HttpException';
import { Request, Response, NextFunction } from 'express';

const permit = function (allowedRoles: Array<string>) {
  return async function (req: Request | any, res: Response, next: NextFunction): Promise<any> {
    const payload = req.user;

    if (allowedRoles.includes(payload['role'])) {
      next();
    } else {
      const err = new HttpException(ERROR.FORBIDDEN, 'Access Forbidden');
      error.handler(err, req, res, next);
    }
  };
};
export default permit;
