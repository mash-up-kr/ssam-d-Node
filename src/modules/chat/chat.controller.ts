import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guards/jwt.auth.guard';
import { ChatService } from './chat.service';

@UseGuards(AuthGuard)
@Controller('chats')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}
}
