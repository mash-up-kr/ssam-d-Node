import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { DeviceTokenRepository, UserRepository } from 'src/repositories';
import { PROFILE_IMAGE_URL_LIST } from 'src/common/constants';

import { LoginReqDto } from './dto/login-req-dto';
import { LoginResDto } from './dto/login-res-dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userRepository: UserRepository,
    private readonly deviceTokenRepository: DeviceTokenRepository
  ) {}

  /**
   * 유저가 있으면 업데이트, 없으면 생성
   */
  async login(loginReqDto: LoginReqDto): Promise<LoginResDto> {
    const userId = await this.getSignedUserId(loginReqDto);

    const payload = { id: userId };
    const accessToken = await this.generateAccessToken(payload);
    const refreshToken = await this.generateRefreshToken(payload);

    await this.userRepository.update(userId, { refreshToken });
    await this.deviceTokenRepository.upsert(loginReqDto.deviceToken, userId);

    const loginData = { userId, accessToken, refreshToken };
    return loginData;
  }

  private getRandomProfileImageURL(): string {
    const randomValue = Math.random();
    return PROFILE_IMAGE_URL_LIST[Math.floor(randomValue * PROFILE_IMAGE_URL_LIST.length)];
  }

  async generateAccessToken(payload: object): Promise<string> {
    return await this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: this.configService.get('TOKEN_EXPRED_TIME'),
    });
  }

  async generateRefreshToken(payload: object): Promise<string> {
    return await this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get('REFRESH_TOKEN_EXPRED_TIME'),
    });
  }

  private async getSignedUserId(loginDto: LoginReqDto): Promise<number> {
    const { socialId, provider, email } = loginDto;

    const savedUser = await this.userRepository.get({ socialId, provider });
    if (savedUser) return savedUser.id;

    const profileImageUrl = this.getRandomProfileImageURL();
    const userData = { socialId, provider, email, profileImageUrl };

    const user = await this.userRepository.save(userData);
    return user.id;
  }
}
