import { Injectable } from '@nestjs/common';
import { ChatRepository } from 'src/repositories';
import { UserNotFoundException } from '../../exceptions';
import { Chat } from '../../domains/chat';

@Injectable()
export class ChatService {
  constructor(private readonly chatRepository: ChatRepository) {}
  async getChatById(id: number): Promise<Chat> {
    const chat = await this.chatRepository.get({ id });
    if (!chat) throw new UserNotFoundException();
    return chat;
  }
}
