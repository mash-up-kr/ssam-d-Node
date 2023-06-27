import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/domains/user';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async get(user: Partial<User>): Promise<User> {
    const userEntity = await this.prisma.user.findFirst({ where: user });
    if (!userEntity) return null;
    return new User(userEntity);
  }

  async delete(id: number): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }

  async update(id: number, userData: Prisma.UserUpdateInput): Promise<User> {
    const user = await this.prisma.user.update({ where: { id }, data: userData });
    return new User(user);
  }

  async save(data: Prisma.UserCreateInput): Promise<User> {
    const user = await this.prisma.user.create({ data });
    return new User(user);
  }
}
