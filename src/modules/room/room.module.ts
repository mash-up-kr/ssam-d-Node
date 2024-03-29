import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { ChatRepository, RoomRepository, RoomUserRepository, UserRepository } from 'src/repositories';
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports: [NotificationModule],
  controllers: [RoomController],
  providers: [RoomService, RoomRepository, RoomUserRepository, UserRepository, ChatRepository],
  exports: [RoomService, RoomRepository, RoomUserRepository],
})
export class RoomModule {}
