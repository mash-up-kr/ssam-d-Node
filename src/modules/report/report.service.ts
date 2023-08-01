import { Injectable } from '@nestjs/common';
import { RoomNotFoundException } from 'src/exceptions';
import { RoomRepository } from 'src/repositories';
import { ReportRepository } from '../../repositories/report.repository';
import { ReportReqDto } from './dto/report-req-dto';

@Injectable()
export class ReportService {
  constructor(private readonly reportRepository: ReportRepository, private readonly roomRepository: RoomRepository) {}

  async submitReport(userId: number, reportReqDto: ReportReqDto): Promise<void> {
    const room = await this.roomRepository.get({ id: reportReqDto.roomId });
    if (!room) throw new RoomNotFoundException();

    await this.reportRepository.save({ reportingUserId: userId, ...reportReqDto });
  }
}
