import { BaseException } from 'src/exceptions/exception.abstract';

export type QuerySpecWrap<T> = {
  [key in keyof T]: T[key];
};

export type ExceptionSpecWrap<T extends BaseException> = {
  statusCode: T['statusCode'];
  message: T['message'];
};
