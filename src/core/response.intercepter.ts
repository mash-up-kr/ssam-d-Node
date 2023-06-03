import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { isObject } from 'class-validator';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(_: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(
      map((data = {}) => {
        if(typeof data !== 'object') return data;
        
        const { message, ...result } = data;
        return {
          message: message ?? 'success',
          data: result,
        };
      }),
    );
  }
}
