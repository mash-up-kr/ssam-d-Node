import { Module } from '@nestjs/common';
import { SignalService } from './signal.service';
import { SignalController } from './signal.controller';

@Module({
  controllers: [SignalController],
  providers: [SignalService]
})
export class SignalModule {}
