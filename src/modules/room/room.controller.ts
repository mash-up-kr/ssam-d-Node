import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guards/jwt.auth.guard';
import { AuthUser } from 'src/common/decorators/auth-user.decorator';
import { RoomService } from './room.service';
import { RoomChatReqDto } from './dto/room-req-dto';

@UseGuards(AuthGuard)
@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get('')
  async getRoomListData(@AuthUser() userId: number) {
    return await this.roomService.getRoomListByUserId(userId);
  }

  @Get('/:id')
  async getRoom(@AuthUser() userId: number, @Param('id', ParseIntPipe) roomId: number) {
    return await this.roomService.getRoomDetail(userId, roomId);
  }

  @Get('/:id/chats')
  async getChatListData(@AuthUser() userId: number, @Param('id', ParseIntPipe) roomId: number) {
    return await this.roomService.getChatList(userId, roomId);
  }

  @Post('/:id/chats')
  async sendChat(
    @AuthUser() userId: number,
    @Param('id', ParseIntPipe) roomId: number,
    @Body() roomChatReqDto: RoomChatReqDto
  ) {
    await this.roomService.sendChat(userId, roomId, roomChatReqDto.content);
  }

  @Get('/:roomId/chats/:chatId')
  async getChatDetail(
    @AuthUser() userId: number,
    @Param('roomId', ParseIntPipe) roomId: number,
    @Param('chatId', ParseIntPipe) chatId: number,
    @Body() roomChatReqDto: RoomChatReqDto
  ) {
    return await this.roomService.getChatDetail(userId, roomId, chatId);
  }
}
