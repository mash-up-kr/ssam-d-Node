import { Injectable } from '@nestjs/common';
import { Room } from 'src/domains/room';
import { RoomUserRepository } from 'src/repositories';
import { RoomRepository } from 'src/repositories/room.repository';

@Injectable()
export class RoomService {
  constructor(
    private readonly roomRepository: RoomRepository,
    private readonly roomUserRepository: RoomUserRepository
  ) {}

  async getRoomsByUserId(userId: number): Promise<Room[]> {
    const roomUsers = await this.roomUserRepository.getRoomUsersByUserId(userId);
    const roomIds = roomUsers.map(roomUser => roomUser.roomId);
    const rooms = await this.roomRepository.getList(roomIds);
    // profileImage, 최근시간, recentContent
    // user 조회 , 최근 chat

    return null;
  }
}
