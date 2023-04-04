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

export const verifyToken = async (): Promise<any> => {
  
};
