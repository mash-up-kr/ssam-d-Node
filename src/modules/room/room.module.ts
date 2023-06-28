import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { RoomRepository, RoomUserRepository, UserRepository } from 'src/repositories';
import { RoomUser } from 'src/domains/room-user';

@Module({
  controllers: [RoomController],
  providers: [RoomService, RoomRepository, RoomUserRepository, UserRepository],
})
export class RoomModule {}
