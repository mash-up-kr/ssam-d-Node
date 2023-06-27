import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { RoomRepository, RoomUserRepository } from 'src/repositories';
import { RoomUser } from 'src/domains/room-user';

@Module({
  controllers: [RoomController],
  providers: [RoomService, RoomRepository, RoomUserRepository],
})
export class RoomModule {}
