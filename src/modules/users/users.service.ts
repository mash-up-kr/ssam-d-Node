import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserReqDto } from './dto/user-req-dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.user.findMany();
  }

  create(userReqDto: UserReqDto) {
    return this.prisma.user.create({ data: userReqDto });
  }
}
