import { Module } from '@nestjs/common';
import { CrashService } from './crash.service';
import { CrashController } from './crash.controller';
import { CrashRepository } from 'src/repositories';

@Module({
  controllers: [CrashController],
  providers: [CrashService, CrashRepository],
})
export class CrashModule {}
