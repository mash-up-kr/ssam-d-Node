import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { LoginReqDto } from './dto/login-req-dto';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/jwt.auth.guard';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  create(@Body() loginReqDto: LoginReqDto) {
    return this.authService.login(loginReqDto);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile() {
    return 'test';
  }
}
