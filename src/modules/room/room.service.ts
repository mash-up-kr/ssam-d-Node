import { Injectable } from '@nestjs/common';
import { getImageColor } from 'src/common/util';
import { RoomRepository, RoomUserRepository, UserRepository } from 'src/repositories';
import { RoomData, RoomWithChat } from './room.type';

@Injectable()
export class RoomService {
  constructor(
    private readonly roomUserRepository: RoomUserRepository,
    private readonly roomRepository: RoomRepository,
    private readonly userRepository: UserRepository
  ) {}

  async getRoomDataListByUserId(userId: number): Promise<RoomData[]> {
    const roomUsers = await this.roomUserRepository.getRoomUsersByUserId(userId);
    const roomIds = roomUsers.map(roomUser => roomUser.roomId);
    const roomListData = await this.roomUserRepository.getRoomListData(userId, roomIds);
    return roomListData
      .sort((a, b) => new Date(a.room.chat[0].createdAt).getTime() - new Date(b.room.chat[0].createdAt).getTime())
      .map(roomData => ({
        id: roomData.id,
        keywords: roomData.room.keywords.split(','),
        recentSignalContent: roomData.room.chat[0].content,
        matchingKeywordCount: roomData.room.keywords.split(',').length,
        profileImage: roomData.user.profileImageUrl,
        recentSignalMillis: new Date(roomData.room.chat[0].createdAt).getTime(),
      }));
  }

  async getChatDataList(userId: number, roomId: number): Promise<RoomWithChat> {
    const matchingUser = await this.roomUserRepository.getMatchingUser(userId, roomId);
    const nowUser = await this.userRepository.get({ id: userId });
    const roomWithChat = await this.roomRepository.getRoomWithChat(roomId);
    return {
      id: roomId,
      keywords: roomWithChat.keywords.split(','),
      matchingUserName: matchingUser.nickname,
      matchingUserProfileImage: matchingUser.profileImageUrl,
      chatColor: getImageColor(matchingUser.profileImageUrl),
      chat: roomWithChat.chat.map(chat => ({
        id: chat.id,
        content: chat.content,
        senderName: chat.senderId == matchingUser.id ? matchingUser.nickname : nowUser.nickname,
        createdAt: new Date(chat.createdAt).getTime(),
      })),
    };
  }
}
