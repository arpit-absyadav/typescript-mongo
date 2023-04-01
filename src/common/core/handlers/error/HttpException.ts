export default class HttpException extends Error {
  public name: string;
  public code: number;
  public message: string;
  public details: [];

  constructor(name: string, message: string, code: number, details: []) {
    super(message);
    this.name = name;
    this.message = message;
    this.code = code;
    this.details = details;
  }
}
