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
}
