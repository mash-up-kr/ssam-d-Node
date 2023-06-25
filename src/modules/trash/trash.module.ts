import { Module } from '@nestjs/common';
import { TrashService } from './trash.service';
import { TrashController } from './trash.controller';

@Module({
  controllers: [TrashController],
  providers: [TrashService]
})
export class TrashModule {}
