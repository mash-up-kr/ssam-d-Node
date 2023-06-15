import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/domains/user';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async get(user: Partial<User>): Promise<User> {
    const userEntity = await this.prisma.user.findFirst({ where: user });
    if (!userEntity) return null;
    return new User(userEntity);
  }

  async update(id: number, userData: Partial<User>): Promise<User> {
    const user = await this.prisma.user.update({ where: { id }, data: userData });
    return new User(user);
  }
}
