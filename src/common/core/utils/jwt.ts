import { config } from './../../../config/index';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

export enum TOKEN_TYPE {
  ACCESS = 'access',
  REFRESH = 'refresh',
}

export interface ITokenPayload {
  id?: string;
  email: string;
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

export const checkJwt = (req: Request, res: Response, next: NextFunction): any => {
  //Get the jwt token from the head
  const token = <string>req.headers['auth'];
  let jwtPayload;

  //Try to validate the token and get data
  try {
    jwtPayload = <any>jwt.verify(token, config.ACCESS_TOKEN_SECRET);
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    //If token is not valid, respond with 401 (unauthorized)
    res.status(401).send();
    return;
  }

  //The token is valid for 1 hour
  //We want to send a new token on every request
  const { userId, username } = jwtPayload;
  const newToken = jwt.sign({ userId, username }, config.ACCESS_TOKEN_SECRET, {
    expiresIn: config.ACCESS_TOKEN_SECRET,
  });
  res.setHeader('token', newToken);

  //Call the next middleware or controller
  next();
};
