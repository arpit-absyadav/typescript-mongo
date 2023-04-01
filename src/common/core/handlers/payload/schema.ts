import { config } from '../../../../config';
import { ICustomError, ISuccessPayload } from '../../interfaces';

interface CommonErrorInterface {
  name?: string;
  code?: number;
  error?: {
    message?: string;
  };
}

export default class PayloadSchema {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public success(data: any): ISuccessPayload {
    return {
      data,
      meta: {
        version: config.API_VERSION,
        timestamp: new Date(),
      },
    };
  }

  /**
   * commonError
   */
  public error(err: CommonErrorInterface | any): ICustomError {
    const key = err.name || '';
    return {
      error: {
        key,
        code: err.code,
        message: err.error.message || err,
      },
      meta: {
        version: config.API_VERSION,
        timestamp: new Date(),
      },
    };
  }
}
