import { Injectable } from '@nestjs/common';
import { ChatRepository } from 'src/repositories';

@Injectable()
export class ChatService {
  constructor(private readonly chatRepository: ChatRepository) {}
}
