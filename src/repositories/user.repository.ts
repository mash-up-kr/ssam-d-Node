import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/domains/user';
import { Prisma } from '@prisma/client';
import { PrismaTransaction } from 'src/types/prisma.type';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async get(user: Partial<User>, transaction?: PrismaTransaction): Promise<User> {
    const prisma = transaction ?? this.prisma;

    const userEntity = await prisma.user.findFirst({ where: user });
    if (!userEntity) return null;
    return new User(userEntity);
  }

  async delete(id: number): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }

  async update(id: number, userData: Prisma.UserUpdateInput, transaction?: PrismaTransaction): Promise<User> {
    const prisma = transaction ?? this.prisma;

    const user = await prisma.user.update({ where: { id }, data: userData });
    return new User(user);
  }

  async save(data: Prisma.UserCreateInput, transaction?: PrismaTransaction): Promise<User> {
    const prisma = transaction ?? this.prisma;

    const user = await prisma.user.create({ data });
    return new User(user);
  }
  async getUserList(userId: number[], transaction?: PrismaTransaction): Promise<User[]> {
    const prisma = transaction ?? this.prisma;

    const user = await prisma.user.findMany({ where: { id: { in: userId } } });

    return user.map(user => new User(user));
  }
}
