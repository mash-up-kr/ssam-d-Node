import { Module } from '@nestjs/common';
import { SignalService } from './signal.service';
import { SignalController } from './signal.controller';
import { SignalRepository } from 'src/repositories';

@Module({
  controllers: [SignalController, SignalRepository],
  providers: [SignalService],
})
export class SignalModule {}
