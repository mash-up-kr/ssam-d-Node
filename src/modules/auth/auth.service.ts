import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { JwtService } from '@nestjs/jwt';
import { LoginReqDto } from './dto/login-req-dto';
import { User, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginResDto } from './dto/login-res-dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService
  ) {}

  async login(loginReqDto: LoginReqDto) {
    const { nickname, socialId, email, provider } = loginReqDto;
    //const newuser = await this.prisma.user.findFirst({ where: { email } });

    const user = await this.getUserExist(email);

    if (!user) {
      const user = await this.prisma.user.create({
        //저장
        data: {
          nickname: nickname,
          email: email,
          social_id: socialId,
          provider: provider,
        },
      });
    }

    //TODO: jwt ,refresh token

    const payload = { id: user.id };
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get('REFRESH_TOKEN_EXPRED_TIME_MS'),
    });
    //db에 refreshToken 저장
    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        refresh_token: refreshToken,
      },
    });

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: this.configService.get('TOKEN_EXPRED_TIME_MS'),
    });
    return new LoginResDto({
      accessToken,
      refreshToken,
    });
  }
  //아이디로 조회
  async getUserIdIfExist(id: number) {
    const user = await this.prisma.user.findFirst({ where: { id } });

    if (user) {
      return { id: user.id, nickname: user.nickname, email: user.email };
    } else throw new UnauthorizedException();
  }

  //이메일로 조회
  async getUserExist(email: string) {
    const user = await this.prisma.user.findFirst({ where: { email } });

    return user;
  }
}
