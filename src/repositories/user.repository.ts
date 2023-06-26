import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/domains/user';
import { Prisma } from '@prisma/client';
import { PrismaTransaction } from 'src/types/prisma.type';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async get(user: Partial<User>, tx?: PrismaTransaction): Promise<User> {
    const prisma = tx ?? this.prisma;

    const userEntity = await prisma.user.findFirst({ where: user });
    if (!userEntity) return null;
    return new User(userEntity);
  }

  async delete(id: number): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }

  async update(id: number, userData: Prisma.UserUpdateInput, tx?: PrismaTransaction): Promise<User> {
    const prisma = tx ?? this.prisma;

    const user = await prisma.user.update({ where: { id }, data: userData });
    return new User(user);
  }

  async save(data: Prisma.UserCreateInput, tx?: PrismaTransaction): Promise<User> {
    const prisma = tx ?? this.prisma;

    const user = await prisma.user.create({ data });
    return new User(user);
  }
}
