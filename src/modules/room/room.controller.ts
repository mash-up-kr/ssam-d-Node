import { Controller, Get, Post, Body, Param, UseGuards, ParseIntPipe } from '@nestjs/common';
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
    return await this.roomService.getRoomDataListByUserId(userId);
  }

  @Get('/:id/chats')
  async getChatListData(@AuthUser() userId: number, @Param('id') roomId: string) {
    return await this.roomService.getChatDataList(userId, +roomId);
  }

  @Post('/:id/chats')
  async sendChat(
    @AuthUser() userId: number,
    @Param('id', ParseIntPipe) roomId: number,
    @Body() roomChatReqDto: RoomChatReqDto
  ) {
    await this.roomService.sendChat(userId, roomId, roomChatReqDto.content);
  }
}
