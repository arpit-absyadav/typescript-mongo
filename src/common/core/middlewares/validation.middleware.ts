import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { error } from '../handlers';
import { ERROR } from '../handlers/consts';
import { HttpException } from '../handlers/error/HttpException';
import { IdValidator } from '../../validators/id.validator';

export enum VALIDATION_TYPE {
  REQ_BODY = 'body',
  REQ_QUERY = 'query',
  REQ_PARAMS = 'params',
}

export interface IValidateRequest {
  validators: InstanceType<any>;
  type: VALIDATION_TYPE;
  paramName?: string;
  skipMissingProperties?: boolean;
  whitelist?: boolean;
  forbidNonWhitelisted?: boolean;
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
export const RequestValidator = ({
  validators,
  type,
  paramName,
  forbidNonWhitelisted = false,
  skipMissingProperties = false,
  whitelist = false,
}: IValidateRequest) => {
  return (req: Request, res: Response, next: NextFunction): any => {
    let data = req[type];
    if (type === VALIDATION_TYPE.REQ_PARAMS || validators instanceof IdValidator) {
      console.log('Inside');

      data = { id: req[type][paramName] };
    }
    console.log(data);

    const dataToValidate = plainToInstance(validators, data);
    validateOrReject(dataToValidate, { skipMissingProperties, whitelist, forbidNonWhitelisted })
      .then(() => {
        req[type] = dataToValidate;
        if (type === VALIDATION_TYPE.REQ_PARAMS || validators instanceof IdValidator) {
          req[type] = { [paramName]: data.id, ...req[type] };
          delete req[type]['id'];
        }

        next();
      })
      .catch((errors) => {
        const [FirstError] = errors;
        const firstKey = Object.keys(FirstError.constraints)[0];

        const err: any = new HttpException(
          ERROR.VALIDATION_ERROR,
          FirstError.constraints[firstKey],
          [...Object.values(FirstError.constraints)],
        );

        error.handler(err, req, res, next);
      });
  };
};
