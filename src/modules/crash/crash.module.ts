import { Module } from '@nestjs/common';
import { CrashService } from './crash.service';
import { CrashController } from './crash.controller';
import { ChatRepository, CrashRepository, RoomRepository, RoomUserRepository } from 'src/repositories';
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports: [NotificationModule],
  controllers: [CrashController],
  providers: [CrashService, CrashRepository, RoomRepository, RoomUserRepository, ChatRepository],
})
export class CrashModule {}
