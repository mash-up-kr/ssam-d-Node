import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { JwtService } from '@nestjs/jwt';
import { LoginReqDto } from './dto/login-req-dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/domains/user';
import { UserRepository } from 'src/repositories';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
    private readonly userRepository: UserRepository
  ) {}

  async login(loginReqDto: LoginReqDto) {
    const { socialId, email, provider } = loginReqDto;

    /**
     * 유저가 있으면 업데이트, 없으면 생성
     */

    const userData = { email: email, provider: provider };
    const user = await this.userRepository.upsert(socialId, userData);

    const payload = { id: user.id };
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get('REFRESH_TOKEN_EXPRED_TIME'),
    });
    //db에 refreshToken 저장

    const updatedRfreshToken = { refreshToken: refreshToken };

    await this.userRepository.update(user.id, updatedRfreshToken);

    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: this.configService.get('TOKEN_EXPRED_TIME'),
      }),
    };
  }
}
