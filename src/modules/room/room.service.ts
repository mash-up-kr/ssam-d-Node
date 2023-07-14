import { Injectable } from '@nestjs/common';
import { getImageColor } from 'src/common/util';
import { ChatRepository, RoomRepository, RoomUserRepository, UserRepository } from 'src/repositories';
import { RoomWithChat } from './room.type';
import { Chat } from 'src/domains/chat';
import { CannotSendChatException, RoomNotFoundException } from 'src/exceptions';
import { RoomResDto } from './dto/room-res-dto';

@Injectable()
export class RoomService {
  constructor(
    private readonly roomUserRepository: RoomUserRepository,
    private readonly roomRepository: RoomRepository,
    private readonly userRepository: UserRepository,
    private readonly chatRepository: ChatRepository
  ) {}

  async getRoomListByUserId(userId: number): Promise<RoomResDto[]> {
    const roomUsers = await this.roomUserRepository.getRoomUsersByUserId(userId);
    const roomIds = roomUsers.map(roomUser => roomUser.roomId);
    return await this.roomUserRepository.getRoomList(userId, roomIds);
  }

  async getChatList(userId: number, roomId: number): Promise<RoomWithChat> {
    const matchingUser = await this.roomUserRepository.getMatchingUser(userId, roomId);
    const nowUser = await this.userRepository.get({ id: userId });
    const room = await this.roomRepository.get({ id: roomId });
    if (!room) throw RoomNotFoundException;
    const chatList = await this.chatRepository.getListByRoomId(roomId);

    return {
      id: roomId,
      keywords: room.keywords.split(','),
      matchingUserName: matchingUser.nickname,
      matchingUserProfileImage: matchingUser.profileImageUrl,
      chatColor: getImageColor(matchingUser.profileImageUrl),
      chat: chatList.map(chat => ({
        id: chat.id,
        content: chat.content,
        senderName: chat.senderId == matchingUser.id ? matchingUser.nickname : nowUser.nickname,
        createdAt: new Date(chat.createdAt).getTime(),
      })),
    };
  }

  async sendChat(senderId: number, roomId: number, content: string) {
    const senderInRoom = await this.roomUserRepository.get(senderId, roomId);
    if (!senderInRoom) throw new CannotSendChatException();

    const chat = new Chat({ senderId, roomId, content });
    await this.chatRepository.save(chat);

    /**
     * @todo fcm alarm
     */
  }
}
