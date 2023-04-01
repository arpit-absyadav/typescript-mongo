import { IErrorPayload, ISuccessPayload } from './../../interfaces';
import { ERROR, STATUS } from '../consts';
import PayloadSchema from './schema';
export default class Payload {
  private payloadSchema = new PayloadSchema();

  /**
   * Returns a error payload based on the err object passed
   * @param {*} err Error object
   */
  public errorPayload(err: IErrorPayload | any): any {
    console.error('------------');
    console.error(err);
    let { name } = err;

    if (err.key) {
      name = err.key;
    }

    if (err.name === ERROR.MONGO_ERROR) {
      name = err.code;
    }

    let payload = {};

    switch (name) {
      case ERROR.SYNTAX_ERROR:
        payload = this.payloadSchema.error({
          name,
          error: err,
          code: STATUS.BAD_REQUEST,
        });
        break;
      case ERROR.TOKEN_EXPIRED_ERROR:
      case ERROR.JWT_ERROR:
      case ERROR.FORBIDDEN:
        payload = this.payloadSchema.error({
          name,
          error: err,
          code: STATUS.FORBIDDEN,
        });
        break;
      case ERROR.MISSING_REQUIRED_PARAMETER:
      case ERROR.VALIDATION_ERROR:
        payload = this.payloadSchema.error({
          name,
          error: err,
          code: STATUS.BAD_REQUEST,
        });
        break;
      case ERROR.CONFLICT:
      case ERROR.MONGO_ERROR:
      case ERROR.MONGO_11000:
      case '11000':
        payload = this.payloadSchema.error({
          name,
          error: { message: 'Duplicate' },
          code: STATUS.CONFLICT,
        });
        break;

      case ERROR.RESOURCE_NOT_FOUND:
      case ERROR.NOT_FOUND:
        payload = this.payloadSchema.error({
          name,
          error: err,
          code: STATUS.NOT_FOUND,
        });
        break;
      case ERROR.PRECONDITION_FAILED:
        payload = this.payloadSchema.error({
          name,
          error: err,
          code: STATUS.PRECONDITION_FAILED,
        });
        break;
      case ERROR.EXPIRED:
        payload = this.payloadSchema.error({
          name,
          error: err,
          code: STATUS.GONE,
        });
        break;
      case ERROR.RE_AUTHENTICATION:
        payload = this.payloadSchema.error({
          name,
          error: err,
          code: STATUS.UNAUTHORIZED,
        });
        break;
      default:
        payload = this.payloadSchema.error({
          name,
          error: { message: 'Internal Server Error' },
          code: STATUS.INTERNAL_SERVER_ERROR,
        });
        break;
    }
    return payload;
  }

  /**
   * Handler success and send appropriate response
   * @param data
   * @param req
   * @param res
   * @returns {*}
   */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public successPayload(data: any): ISuccessPayload {
    return this.payloadSchema.success(data);
  }
}
