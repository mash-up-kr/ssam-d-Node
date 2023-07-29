import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthUser } from 'src/common/decorators/auth-user.decorator';
import { AuthGuard } from '../auth/guards/jwt.auth.guard';
import { UserNicknameReqDto } from './dto/user-req-dto';
import { UserResDto } from './dto/user-res-dto';
import { PageReqDto } from '../../common/dto/page-req-dto';
import { SignalService } from '../signal/signal.service';

@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService, private readonly signalService: SignalService) {}

  @Get('/nickname/duplication')
  async isDuplicatedNickname(@AuthUser() userId: number, @Query('nickname') nickname: string) {
    await this.usersService.isDuplicatedNickname(userId, nickname);
  }

  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Get('/signals')
  async getSentSignals(@AuthUser() userId: number, @Query() pageReqDto: PageReqDto) {
    const page = new PageReqDto(pageReqDto.pageNo, pageReqDto.pageLength);
    return await this.signalService.getSentSignals(userId, page);
  }

  @Delete('/:id')
  async deleteUserById(@Param('id', ParseIntPipe) id: number) {
    await this.usersService.deleteById(id);
  }

  @Get('/:id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.getUserById(id);
    return new UserResDto(user);
  }

  @Patch('/nickname')
  async updateNickname(@AuthUser() userId: number, @Body() userNicknameDto: UserNicknameReqDto) {
    await this.usersService.updateNickname(userId, userNicknameDto);
  }

  @Patch('/alarm')
  async updateAgreeAlarm(@AuthUser() userId: number, @Body('agreeAlarm') agreeAlarm: boolean) {
    await this.usersService.updateAgreeAlarm(userId, agreeAlarm);
  }

  @Get('/signals/:id')
  async getSentSignalDetail(@AuthUser() userId: number, @Param('id', ParseIntPipe) signalId: number) {
    return await this.signalService.getSentSignalDetail(userId, signalId);
  }
}
