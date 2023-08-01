import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { ReportRepository } from 'src/repositories/report.repository';
import { RoomRepository } from 'src/repositories';

@Module({
  controllers: [ReportController],
  providers: [ReportService, ReportRepository, RoomRepository],
})
export class ReportModule {}
