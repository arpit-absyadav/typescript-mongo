import { UserService } from './../../../modules/users/user.service';
import { config } from './../../../config/index';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { error } from '../handlers';
import { HttpException } from '../handlers/error/HttpException';
import { ERROR } from '../handlers/consts';

export enum TOKEN_TYPE {
  ACCESS = 'access',
  REFRESH = 'refresh',
}

export interface ITokenPayload {
  id?: string;
  email: string;
  role: string;
}

export const signToken = async (payload: ITokenPayload, type: TOKEN_TYPE): Promise<string> => {
  return jwt.sign(
    payload,
    type === TOKEN_TYPE.ACCESS ? config.ACCESS_TOKEN_SECRET : config.REFRESH_TOKEN_SECRET,
    {
      expiresIn:
        type === TOKEN_TYPE.ACCESS ? config.ACCESS_TOKEN_EXP_TIME : config.REFRESH_TOKEN_EXP_TIME,
    },
  );
};

export const auth = function (tokenType: TOKEN_TYPE): any {
  return async function (req: Request | any, res: Response, next: NextFunction): Promise<any> {
    const userService = new UserService();
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new HttpException(ERROR.RE_AUTHENTICATION, 'Unauthorized');
    }
    try {
      const decodedToken: ITokenPayload | any = jwt.verify(
        token,
        tokenType === TOKEN_TYPE.ACCESS ? config.ACCESS_TOKEN_SECRET : config.REFRESH_TOKEN_SECRET,
      );
      const user = await userService.getByEmail({ email: decodedToken.email });
      req.user = user;
      next();
    } catch (err) {
      error.handler(err, req, res, next);
    }
  };
};

export const decodeToken = (token: string): any =>{
  const decodedData: ITokenPayload | any = jwt.decode(token);
  if (decodeToken) return decodedData;
  return false
};
