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

  async delete(id: number): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }

  async update(id: number, userData: Partial<User>): Promise<User> {
    const user = await this.prisma.user.update({ where: { id }, data: userData });
    return new User(user);
  }
  async save(userData: User): Promise<User> {
    const user = await this.prisma.user.create({ data: userData });
    return new User(user);
  }
  async upsert(socialId: string, userData: Partial<User>): Promise<User> {
    const { email, provider } = userData;

    const user = await this.prisma.user.upsert({
      where: { socialId },
      update: { socialId },
      create: { socialId, email, provider },
    });
    return new User(user);
  }
}
