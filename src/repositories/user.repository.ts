import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async get(args: Prisma.UserFindFirstArgs): Promise<User> {
    const user = this.prisma.user.findFirst(args);
    return new User(user);
  }

  async update(id: number, userData: Partial<User>): Promise<User> {
    const user = await this.prisma.user.update({ where: { id }, data: userData });
    return new User(user);
  }
}
