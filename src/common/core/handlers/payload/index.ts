import { IErrorPayload, ISuccessPayload } from './../../interfaces';
import { ERROR, RESPONSE_CODE } from '../consts';
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
    // eslint-disable-next-line prefer-const
    let { name, details = [] } = err;

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
          code: RESPONSE_CODE.BAD_REQUEST,
          details,
        });
        break;
      case ERROR.TOKEN_EXPIRED_ERROR:
      case ERROR.JWT_ERROR:
      case ERROR.FORBIDDEN:
        payload = this.payloadSchema.error({
          name,
          error: err,
          code: RESPONSE_CODE.FORBIDDEN,
          details,
        });
        break;
      case ERROR.MISSING_REQUIRED_PARAMETER:
      case ERROR.VALIDATION_ERROR:
        payload = this.payloadSchema.error({
          name,
          error: err,
          code: RESPONSE_CODE.BAD_REQUEST,
          details,
        });
        break;
      case ERROR.CONFLICT:
      case ERROR.MONGO_ERROR:
      case ERROR.MONGO_11000:
      case '11000':
        payload = this.payloadSchema.error({
          name,
          error: { message: 'Duplicate' },
          code: RESPONSE_CODE.CONFLICT,
          details,
        });
        break;

      case ERROR.RESOURCE_NOT_FOUND:
      case ERROR.NOT_FOUND:
        payload = this.payloadSchema.error({
          name,
          error: err,
          code: RESPONSE_CODE.NOT_FOUND,
          details,
        });
        break;
      case ERROR.PRECONDITION_FAILED:
        payload = this.payloadSchema.error({
          name,
          error: err,
          code: RESPONSE_CODE.PRECONDITION_FAILED,
          details,
        });
        break;
      case ERROR.EXPIRED:
        payload = this.payloadSchema.error({
          name,
          error: err,
          code: RESPONSE_CODE.GONE,
          details,
        });
        break;
      case ERROR.RE_AUTHENTICATION:
        payload = this.payloadSchema.error({
          name,
          error: err,
          code: RESPONSE_CODE.UNAUTHORIZED,
          details,
        });
        break;
      case ERROR.TOO_MANY_REQUESTS:
        payload = this.payloadSchema.error({
          name,
          error: err,
          code: RESPONSE_CODE.TOO_MANY_REQUESTS,
          details,
        });
        break;
      default:
        payload = this.payloadSchema.error({
          name,
          error: { message: 'Internal Server Error' },
          code: RESPONSE_CODE.INTERNAL_SERVER_ERROR,
          details,
        });
        break;
    }
    console.log('payload', payload);

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
