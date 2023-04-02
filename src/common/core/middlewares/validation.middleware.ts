import { RESPONSE_CODE } from './../handlers/consts/response-code';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { error } from '../handlers';
import { ERROR } from '../handlers/consts';
import HttpException from '../handlers/error/HttpException';

export enum VALIDATION_TYPE {
  REQ_BODY = 'body',
  REQ_QUERY = 'query',
  REQ_PARAMS = 'params',
}

/**
 * @name ValidationMiddleware
 * @description Allows use of decorator and non-decorator based validation
 * @param type dto
 * @param skipMissingProperties When skipping missing properties
 * @param whitelist Even if your object is an instance of a validation class it can contain additional properties that are not defined
 * @param forbidNonWhitelisted If you would rather to have an error thrown when any non-whitelisted properties are present
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const RequestValidator = (
  validators: any,
  type: VALIDATION_TYPE,
  skipMissingProperties = false,
  whitelist = false,
  forbidNonWhitelisted = false,
) => {
  return (req: Request, res: Response, next: NextFunction): any => {
    const data = req[type];
    const dto = plainToInstance(validators, data);
    validateOrReject(dto, { skipMissingProperties, whitelist, forbidNonWhitelisted })
      .then(() => {
        req.body = dto;
        next();
      })
      .catch((errors) => {
        const [FirstError] = errors;
        const firstKey = Object.keys(FirstError.constraints)[0];
        console.log(FirstError);
        console.log(firstKey);

        const err: any = new HttpException(ERROR.VALIDATION_ERROR, FirstError.constraints[firstKey], RESPONSE_CODE.BAD_REQUEST, [
          ...Object.values(FirstError.constraints),
        ]);

        error.handler(err, req, res, next);
        // next(new Error(message));
      });
  };
};
