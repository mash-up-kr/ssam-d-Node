import { ExceptionType } from './exception.type';

export abstract class BaseException {
  readonly type: ExceptionType = ExceptionType.INTERNAL;

  constructor(readonly statusCode: number, public message: string) {
    this.statusCode = statusCode;
    this.message = message;
  }
}
