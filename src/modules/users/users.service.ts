import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserReqDto } from './dto/user-req-dto';
import { User, Prisma } from '@prisma/client'; //User,

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async user(userWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  create(userReqDto: UserReqDto) {
    // return this.prisma.user.create({ data: userReqDto });
  }

  findOne(userReqDto: UserReqDto) {
    const { email } = userReqDto;
    return this.prisma.user.findFirst({ where: { email } });
  }

  async login(userReqDto: UserReqDto) {
    //   const { nickname, email, provider } = userReqDto;
    //   const newuser = await this.prisma.user.findFirst({ where: { email } });
    //   //TODO: jwt ,refresh token
    //   //가입하지 않은 유저이면 db에 저장
    //   //중복되는 코드 어케하지
    //   if (newuser === undefined) {
    //     const refreshToken = 'token';
    //     const accessToken = 'token';
    //     const user = await this.prisma.user.create({
    //       data: {
    //         nickname: nickname,
    //         email: email,
    //         refresh_token: refreshToken,
    //         provider: provider,
    //       },
    //     });
    //     return accessToken;
    //   } else {
    //     const refreshToken = 'token';
    //     const accessToken = 'token';
    //     //TODO: jwt ,refresh token
    //     return accessToken;
    //   }
  }
}
