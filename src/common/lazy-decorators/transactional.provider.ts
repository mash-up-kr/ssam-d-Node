import { Reflector } from '@nestjs/core';
import { Aspect, LazyDecorator, WrapParams } from '@toss/nestjs-aop';
import { PrismaService } from 'src/prisma/prisma.service';

export const TRANSACTIONAL = Symbol('TRANSACTIONAL');

@Aspect(TRANSACTIONAL)
export class TransactionalDecorator implements LazyDecorator<any> {
  constructor(private readonly prisma: PrismaService, private readonly reflector: Reflector) {}

  wrap({ method, instance, methodName }: WrapParams<any>) {
    Reflect.defineMetadata(TRANSACTIONAL, true, instance[methodName]);
    return async (...args: any[]) => {
      return this.prisma.$transaction(async tx => {
        return await method(...args, tx);
      });
    };
  }
}
