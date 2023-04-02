export class HttpException extends Error {
  public name: string;
  public message: string;
  public details: Array<any>;

  constructor(name: string, message: string, details: Array<any> = []) {
    super(message);
    this.name = name;
    this.message = message;
    this.details = details;
  }
}
