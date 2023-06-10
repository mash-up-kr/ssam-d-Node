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

  // async getUserIdIfExist(id: number) {
  // 	const user = await this..findOne({
  // 		where: { id },
  // 	});

  // 	if (user) {
  // 		return { id: user.id, type: user.type };
  // 	} else throw new UnauthorizedException();
  // }
  async login(loginReqDto: LoginReqDto) {
    const { nickname, socialId, email, provider } = loginReqDto;
    //const newuser = await this.prisma.user.findFirst({ where: { email } });
    //TODO: jwt ,refresh token
    //가입하지 않은 유저이면 db에 저장
    //중복되는 코드 어케하지

    /**
     *
     * 1. db에 존재하는지 체크
     * 2. 존재하면 토큰 발급
     * 3. 존재안하면 저장하고 토큰 발급
     *
     *
     * 1. db에 존재하는지 체크
     * 2. 존재 안하면 디비 저장
     * 3. 토큰 발급
     *
     *
     *
     * 4. . jwt 가드로 체크 (유효성)
     */

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

    if (user) {
      return { id: user.id, nickname: user.nickname, email: user.email };
    } else throw new UnauthorizedException();
  }

  //이메일로 조회
  async getUserExist(email: string) {
    const user = await this.prisma.user.findFirst({ where: { email } });

    return user;
    // if (user === undefined)
    //   //존재x
    //   //회원가입 한 적 없으면
    //   return false;
    // else return true;
  }
}
