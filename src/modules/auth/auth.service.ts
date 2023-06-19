import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { JwtService } from '@nestjs/jwt';
import { LoginReqDto } from './dto/login-req-dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserRepository } from 'src/repositories';
import { DeviceTokenRepository } from 'src/repositories';

import { LoginResDto } from './dto/login-res-dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
    private readonly userRepository: UserRepository,
    private readonly deviceTokenRepository: DeviceTokenRepository
  ) {}

  async login(loginReqDto: LoginReqDto) {
    const { socialId, email, provider, deviceToken } = loginReqDto;

    /**
     * 유저가 있으면 업데이트, 없으면 생성
     */

    const userData = { email: email, provider: provider };

    const user = await this.userRepository.upsert(socialId, userData);
    const userId = user.id;
    /**
     * 디바이스 토큰 저장
     */

    const savedDeviceToken = await this.deviceTokenRepository.upsert(deviceToken, userId);

    const payload = { id: user.id };
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get('REFRESH_TOKEN_EXPRED_TIME'),
    });

    const updatedRfreshToken = { refreshToken: refreshToken };

    await this.userRepository.update(userId, updatedRfreshToken);

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: this.configService.get('TOKEN_EXPRED_TIME'),
    });
    return new LoginResDto({
      userId,
      accessToken,
      refreshToken,
      deviceToken: savedDeviceToken.deviceToken,
    });
  }
}
