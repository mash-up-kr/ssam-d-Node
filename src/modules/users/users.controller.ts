import { Controller, Get, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthUser } from 'src/common/decorators/auth-user.decorator';
import { UserOnboardingReqDto } from './dto/user-req-dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * @todo guard
   */
  @Post('/onboarding')
  async saveOnboarding(@AuthUser() userId: number, onboardingDto: UserOnboardingReqDto) {
    await this.usersService.saveOnboarding(userId, onboardingDto);
  }
  }
}
