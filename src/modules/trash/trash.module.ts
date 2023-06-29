import { Module } from '@nestjs/common';
import { TrashService } from './trash.service';
import { TrashController } from './trash.controller';
import { TrashRepository } from 'src/repositories';

@Module({
  controllers: [TrashController],
  providers: [TrashService, TrashRepository],
})
export class TrashModule {}
