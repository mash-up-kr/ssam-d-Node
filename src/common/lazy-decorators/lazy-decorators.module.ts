import { Module } from '@nestjs/common';
import { AopModule } from '@toss/nestjs-aop';
import { TransactionalDecorator } from './transactional.provider';

@Module({
  imports: [AopModule],
  providers: [TransactionalDecorator],
})
export class LazyDecoratorModule {}
