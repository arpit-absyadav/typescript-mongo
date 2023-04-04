import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { ObjectId } from 'mongodb';

@ValidatorConstraint({ name: 'isObjectId', async: false })
export class IsObjectId implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments): boolean {
    return ObjectId.isValid(value);
  }

  defaultMessage(args: ValidationArguments): string {
    return `${args.property} must be a valid ObjectId`;
  }
}
