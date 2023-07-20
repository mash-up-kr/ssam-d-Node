import { Injectable } from '@nestjs/common';
import { getImageColor } from 'src/common/util';
import { ChatRepository, RoomRepository, RoomUserRepository, UserRepository } from 'src/repositories';
import { Chat } from 'src/domains/chat';
import {
  CannotSendChatException,
  ChatNotFoundException,
  MatchingUserNotFoundException,
  RoomNotFoundException,
  UserNotFoundException,
} from 'src/exceptions';
import { RoomResDto } from './dto/room-res-dto';
import { ChatResDto } from '../chat/dto/chat-res-dto';
import { RoomDetailResDto } from './dto/room-detail-res-dto';
import { PageReqDto } from '../../common/dto/page-req-dto';
import { PageResDto } from '../../common/dto/page-res-dto';
import { Transactional } from 'src/common/lazy-decorators/transactional.decorator';
import { PrismaTransaction } from 'src/types/prisma.type';
import { ChatDetailResDto } from '../chat/dto/chat-detail-res-dto';

@Injectable()
export class RoomService {
  constructor(
    private readonly roomUserRepository: RoomUserRepository,
    private readonly roomRepository: RoomRepository,
    private readonly userRepository: UserRepository,
    private readonly chatRepository: ChatRepository
  ) {}
  async getRoomListByUserId(userId: number, pageReqDto: PageReqDto): Promise<PageResDto<RoomResDto>> {
    const roomUsers = await this.roomUserRepository.getRoomUsersByUserId(userId);
    const roomIds = roomUsers.map(roomUser => roomUser.roomId);
    const totalRoomNumber = roomIds.length;
    const roomResDtoList = await this.roomUserRepository.getRoomList(
      userId,
      roomIds,
      pageReqDto.limit(),
      pageReqDto.offset()
    );
    return new PageResDto(totalRoomNumber, pageReqDto.pageLength, roomResDtoList);
  }

  async getRoomDetail(userId: number, roomId: number): Promise<RoomDetailResDto> {
    const room = await this.roomRepository.get({ id: roomId });
    if (!room) throw new RoomNotFoundException();

    const matchingUser = await this.roomUserRepository.getMatchingUser(userId, roomId);
    if (!matchingUser) throw new MatchingUserNotFoundException();

    return new RoomDetailResDto({
      id: roomId,
      keywords: room.keywordList,
      matchingUserName: matchingUser.nickname,
      matchingUserProfileImage: matchingUser.profileImageUrl,
      chatColor: getImageColor(matchingUser.profileImageUrl),
      isAlive: room.isAlive,
    });
  }

  async getChatList(userId: number, roomId: number, pageReqDto: PageReqDto): Promise<PageResDto<ChatResDto>> {
    const nowUser = await this.userRepository.get({ id: userId });
    if (!nowUser) throw new UserNotFoundException();
    const userInRoom = await this.roomUserRepository.get(userId, roomId);
    if (!userInRoom) throw new RoomNotFoundException();

    await this.roomUserRepository.updateIsChatRead(userInRoom.id, true);

    const matchingUser = await this.roomUserRepository.getMatchingUser(userId, roomId);
    if (!matchingUser) throw new MatchingUserNotFoundException();
    const totalChatNumber = await this.chatRepository.countChatByRoomId(roomId);
    const chatList = await this.chatRepository.getListByRoomId(roomId, pageReqDto.limit(), pageReqDto.offset());
    const chatResDtoList = chatList.map(
      chat =>
        new ChatResDto({
          id: chat.id,
          content: chat.content,
          senderName: chat.senderId == matchingUser.id ? matchingUser.nickname : nowUser.nickname,
          receivedTimeMillis: new Date(chat.createdAt).getTime(),
        })
    );
    return new PageResDto(totalChatNumber, pageReqDto.pageLength, chatResDtoList);
  }

  async sendChat(senderId: number, roomId: number, content: string) {
    const senderInRoom = await this.roomUserRepository.get(senderId, roomId);
    if (!senderInRoom) throw new CannotSendChatException();

    const chat = new Chat({ senderId, roomId, content });
    await this.chatRepository.save(chat);

    await this.setUnreadForReceiverRoom(senderId, roomId);

    /**
     * @todo fcm alarm
     */
  }

  async setUnreadForReceiverRoom(senderId: number, roomId: number): Promise<void> {
    const receiver = await this.roomUserRepository.getMatchingUser(senderId, roomId);
    if (!receiver) throw new MatchingUserNotFoundException();
    const receiverInRoom = await this.roomUserRepository.get(receiver.id, roomId);
    if (!receiverInRoom) throw new CannotSendChatException();

    await this.roomUserRepository.updateIsChatRead(receiverInRoom.id, false);
  }

  async getChatDetail(userId: number, roomId: number, chatId: number): Promise<ChatDetailResDto> {
    const chat = await this.chatRepository.get({ id: chatId });
    if (!chat) throw new ChatNotFoundException();
    const sender = await this.userRepository.get({ id: chat.senderId });
    if (!sender) throw new UserNotFoundException();
    const room = await this.roomRepository.get({ id: roomId });
    if (!room) throw new RoomNotFoundException();

    return new ChatDetailResDto({
      id: chatId,
      keywords: room.keywordList,
      matchingKeywordCount: room.keywordList.length,
      content: chat.content,
      profileImage: sender.profileImageUrl,
      nickname: sender.nickname,
      isAlive: room.isAlive,
      isMine: chat.senderId === userId,
      receivedTimeMillis: new Date(chat.createdAt).getTime(),
    });
  }

  @Transactional()
  async deleteRoom(userId: number, roomId: number, transaction: PrismaTransaction = null) {
    const room = await this.roomRepository.get({ id: roomId }, transaction);
    if (room.isAlive) {
      await this.roomRepository.setIsAliveFalse(roomId, transaction);
    } else {
      await this.roomRepository.deleteRoom(roomId, transaction);
    }
    await this.roomUserRepository.delete(roomId, userId, transaction);
  }
}
