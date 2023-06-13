import { Body, Controller, Post } from '@nestjs/common';
import { LoginReqDto } from './dto/login-req-dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  create(@Body() loginReqDto: LoginReqDto) {
    return this.authService.login(loginReqDto);
  }
}
