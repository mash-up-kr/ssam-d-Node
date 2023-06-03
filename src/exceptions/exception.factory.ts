import { BaseException } from './exception.abstract';
import { ExceptionParams, ExceptionType } from './exception.type';

export const createException = (exceptionType: ExceptionType) => {
  return <T extends string = string>(defaultStatusCode = 500, defaultMessage: T) => {
    return class extends BaseException {
      name: string;
      type = exceptionType;

      constructor(arg?: ExceptionParams<T>) {
        super(
          defaultStatusCode,
          arg ? composeExceptionMessage(defaultMessage, arg) : defaultMessage,
        );
      }
    };
  };
};

function composeExceptionMessage(message: string, options = {}) {
  return message.replace(/{{([a-zA-Z0-9_-]+)}}/g, (_: string, matched: string) => {
    return options[matched];
  });
}
