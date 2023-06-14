import { Body, Controller, Get, Patch, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthUser } from 'src/common/decorators/auth-user.decorator';
import { UserOnboardingReqDto } from './dto/user-req-dto';
import { AuthGuard } from '../auth/guards/jwt.auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get('/nickname/duplication')
  async isDuplicatedNickname(@Query('nickname') nickname: string) {
    await this.usersService.isDuplicatedNickname(nickname);
  }

  @UseGuards(AuthGuard)
  @Patch('/onboarding')
  async saveOnboarding(@AuthUser() userId: number, @Body() onboardingDto: UserOnboardingReqDto) {
    await this.usersService.saveOnboarding(userId, onboardingDto);
  }

  @UseGuards(AuthGuard)
  @Patch('/alarm')
  async updateAgreeAlarm(@AuthUser() userId: number, @Body('agreeAlarm') agreeAlarm: boolean) {
    await this.usersService.updateAgreeAlarm(userId, agreeAlarm);
  }
}
