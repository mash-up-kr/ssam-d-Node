import { Body, Controller, Post } from '@nestjs/common';
import { LoginReqDto } from './dto/login-req-dto';
import { AuthService } from './auth.service';
import { LoginResDto } from './dto/login-res-dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async create(@Body() loginReqDto: LoginReqDto) {
    const loginData = await this.authService.login(loginReqDto);
    return new LoginResDto({
      userId: loginData.userId,
      accessToken: loginData.accessToken,
      refreshToken: loginData.refreshToken,
      deviceToken: loginData.deviceToken,
    });
  }
}
