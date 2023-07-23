import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '../auth/guards/jwt.auth.guard';
import { AuthUser } from 'src/common/decorators/auth-user.decorator';
import { RoomService } from './room.service';
import { RoomChatReqDto } from './dto/room-req-dto';
import { PageReqDto } from '../../common/dto/page-req-dto';

@UseGuards(AuthGuard)
@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @UsePipes(new ValidationPipe({ transform: true }))
  @Get('')
  async getRoomList(@AuthUser() userId: number, @Query() pageReqDto: PageReqDto) {
    const page = new PageReqDto(pageReqDto.pageNo, pageReqDto.pageLength);
    return await this.roomService.getRoomListByUserId(userId, page);
  }

  @Get('/:id')
  async getRoom(@AuthUser() userId: number, @Param('id', ParseIntPipe) roomId: number) {
    return await this.roomService.getRoomDetail(userId, roomId);
  }

  @UsePipes(new ValidationPipe({ transform: true }))
  @Get('/:id/chats')
  async getChatList(
    @AuthUser() userId: number,
    @Param('id', ParseIntPipe) roomId: number,
    @Query() pageReqDto: PageReqDto
  ) {
    const page = new PageReqDto(pageReqDto.pageNo, pageReqDto.pageLength);
    return await this.roomService.getChatList(userId, roomId, page);
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

  @Delete('/:id')
  async delete(@AuthUser() userId: number, @Param('id', ParseIntPipe) roomId: number) {
    await this.roomService.deleteRoom(userId, roomId);
  }
}
