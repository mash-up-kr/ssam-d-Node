import { Injectable } from '@nestjs/common';
import { Report } from 'src/domains/report';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReportRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(report: Omit<Report, 'id' | 'createdAt'>): Promise<void> {
    await this.prisma.report.create({
      data: report,
    });
  }
}
