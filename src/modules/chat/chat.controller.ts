import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthUser } from 'src/common/decorators/auth-user.decorator';
import { AuthGuard } from '../auth/guards/jwt.auth.guard';
import { ChatService } from './chat.service';

@UseGuards(AuthGuard)
@Controller('chats')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}
}
