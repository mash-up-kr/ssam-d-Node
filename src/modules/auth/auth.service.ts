import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { JwtService } from '@nestjs/jwt';
import { LoginReqDto } from './dto/login-req-dto';
import { UserRepository } from 'src/repositories';
import { DeviceTokenRepository } from 'src/repositories';
import { PROFILE_IMAGE_URL_LIST } from 'src/common/constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userRepository: UserRepository,
    private readonly deviceTokenRepository: DeviceTokenRepository
  ) {}

  async login(loginReqDto: LoginReqDto) {
    const { socialId, email, provider, deviceToken } = loginReqDto;

    /**
     * 유저가 있으면 업데이트, 없으면 생성
     */

    const userData = {
      email: email,
      provider: provider,
      profileImageUrl: PROFILE_IMAGE_URL_LIST[Math.floor(Math.random() * PROFILE_IMAGE_URL_LIST.length)],
    };

    const user = await this.userRepository.upsert(socialId, userData);
    const userId = user.id;
    /**
     * 디바이스 토큰 저장
     */

    const savedDeviceToken = await this.deviceTokenRepository.upsert(deviceToken, userId);
    const payload = { id: user.id };
    const refreshToken = await this.generateRefreshToken(payload);
    const updatedRfreshToken = { refreshToken: refreshToken };

    await this.userRepository.update(userId, updatedRfreshToken);
    const accessToken = await this.generateAccessToken(payload);
    const loginData = { userId, accessToken, refreshToken, deviceToken: savedDeviceToken.deviceToken };
    return loginData;
  }
  async generateAccessToken(payload: object) {
    return await this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: this.configService.get('TOKEN_EXPRED_TIME'),
    });
  }
  async generateRefreshToken(payload: object) {
    return await this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get('REFRESH_TOKEN_EXPRED_TIME'),
    });
  }
}
