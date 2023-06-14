import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { BaseException } from 'src/exceptions/exception.abstract';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: BaseException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const responseBody = {
      statusCode: 500,
      message: '예상치 못한 에러가 발생했습니다. 노드팀을 채찍질 해주세요',
    };

    if (exception instanceof BaseException) {
      responseBody.statusCode = exception.statusCode;
      responseBody.message = exception.composedMessage ?? exception.message;
    }

    response.status(responseBody.statusCode).json(responseBody);
  }
}
