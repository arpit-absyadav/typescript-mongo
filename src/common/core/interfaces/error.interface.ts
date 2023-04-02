export interface ICustomError {
  error: {
    key: string;
    code: number;
    message: string;
    details?: any[];
  };
  meta: {
    version: string | number;
    timestamp: Date;
  };
}

export interface IErrorPayload {
  name?: string;
  key?: string;
  code?: string;
}

export interface IThrowNotFound {
  item: string;
}
export interface IThrowError {
  message: string;
  field_name?: string;
}
