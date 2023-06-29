import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { ChatRepository, RoomRepository, RoomUserRepository, UserRepository } from 'src/repositories';

@Module({
  controllers: [RoomController],
  providers: [RoomService, RoomRepository, RoomUserRepository, UserRepository, ChatRepository],
})
export class RoomModule {}
