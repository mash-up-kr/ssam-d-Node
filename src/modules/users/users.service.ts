import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserReqDto } from './dto/user-req-dto';
import { User, Prisma } from '@prisma/client'; //User,

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(userReqDto: UserReqDto) {
    const { email } = userReqDto;
    return this.prisma.user.findFirst({ where: { email } });
  }
}
