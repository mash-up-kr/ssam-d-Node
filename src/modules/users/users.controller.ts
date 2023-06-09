import { Body, Controller, Delete, Get, Param, Patch, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthUser } from 'src/common/decorators/auth-user.decorator';
import { AuthGuard } from '../auth/guards/jwt.auth.guard';
import { UserNicknameReqDto } from './dto/user-req-dto';
import { UserResDto } from './dto/user-res-dto';
@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/nickname/duplication')
  async isDuplicatedNickname(@AuthUser() userId: number, @Query('nickname') nickname: string) {
    await this.usersService.isDuplicatedNickname(userId, nickname);
  }

  @Delete('/:id')
  async deleteUserById(@Param('id') id: string) {
    await this.usersService.deleteById(+id);
  }

  @Get('/:id')
  async getUserById(@Param('id') id: string) {
    const user = await this.usersService.getUserById(+id);
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
}
