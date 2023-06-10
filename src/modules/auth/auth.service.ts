import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { JwtService } from '@nestjs/jwt';
import { LoginReqDto } from './dto/login-req-dto';
import { User, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService
  ) {}

  async login(loginReqDto: LoginReqDto) {
    const { nickname, socialId, email, provider } = loginReqDto;

    /**
     * 유저가 있으면 업데이트, 없으면 생성
     */
    const upsertUser = await this.prisma.user.upsert({
      where: {
        socialId: socialId,
      },
      update: {
        socialId: socialId,
      },
      create: {
        nickname: nickname,
        email: email,
        socialId: socialId,
        provider: provider,
      },
    });

    const payload = { id: upsertUser.id };
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get('REFRESH_TOKEN_EXPRED_TIME_MS'),
    });
    //db에 refreshToken 저장
    await this.prisma.user.update({
      where: {
        id: upsertUser.id,
      },
      data: {
        refreshToken: refreshToken,
      },
    });

    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: this.configService.get('TOKEN_EXPRED_TIME_MS'),
      }),
    };
  }
  //아이디로 조회
  async getUserIdIfExist(id: number) {
    const user = await this.prisma.user.findFirst({ where: { id } });

    if (!user) {
      throw new UnauthorizedException();
    }

    return { id: user.id, nickname: user.nickname, email: user.email };
  }

  //이메일로 조회
  async getUserExist(email: string) {
    const user = await this.prisma.user.findFirst({ where: { email } });

    return user;
  }
}
