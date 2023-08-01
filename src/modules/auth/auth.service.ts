import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { DeviceTokenRepository, UserKeywordRepository, UserRepository } from 'src/repositories';

import { LoginReqDto } from './dto/login-req-dto';
import { LoginResDto } from './dto/login-res-dto';
import { PrismaTransaction } from 'src/types/prisma.type';
import { Transactional } from 'src/common/lazy-decorators/transactional.decorator';
import { getRandomProfileImageURL } from 'src/common/util';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userRepository: UserRepository,
    private readonly userKeywordRepository: UserKeywordRepository,
    private readonly deviceTokenRepository: DeviceTokenRepository
  ) {}

  /**
   * 유저가 있으면 업데이트, 없으면 생성
   */
  @Transactional()
  async login(loginReqDto: LoginReqDto, tx: PrismaTransaction = null): Promise<LoginResDto> {
    const userId = await this.getSignedUserId(loginReqDto, tx);

    const payload = { id: userId };
    const accessToken = await this.generateAccessToken(payload);
    const refreshToken = await this.generateRefreshToken(payload);

    await this.userRepository.update(userId, { refreshToken }, tx);
    await this.deviceTokenRepository.upsert(loginReqDto.deviceToken, userId, tx);

    const user = await this.userRepository.get({ id: userId });
    const keywords = await this.userKeywordRepository.getSubscribingKeywords(userId);

    return { userId, accessToken, refreshToken, user, keywords };
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

  private async getSignedUserId(loginDto: LoginReqDto, tx?: PrismaTransaction): Promise<number> {
    const { socialId, provider, email } = loginDto;

    const savedUser = await this.userRepository.get({ socialId, provider }, tx);
    if (savedUser) return savedUser.id;

    const profileImageUrl = getRandomProfileImageURL();
    const userData = { socialId, provider, email, profileImageUrl };

    const user = await this.userRepository.save(userData, tx);
    return user.id;
  }
}
