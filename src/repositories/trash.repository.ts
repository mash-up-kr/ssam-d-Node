import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TrashRepository {
  constructor(private readonly prisma: PrismaService) {}
}
