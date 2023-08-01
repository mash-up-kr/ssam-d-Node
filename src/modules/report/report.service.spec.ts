import { Test, TestingModule } from '@nestjs/testing';
import { ChatRepository, RoomRepository } from '../../repositories';
import { ReportService } from './report.service';
import { ReportRepository } from 'src/repositories/report.repository';
import { MockReportRepository } from 'test/mock/repositories/mock-report-repository';
import { MockRoomRepository } from '../../../test/mock/repositories';

describe('ReportService', () => {
  let reportService: ReportService;
  let reportRepository: ReturnType<typeof MockReportRepository>;
  let roomRepository: ReturnType<typeof MockRoomRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReportService,
        {
          provide: ReportRepository,
          useValue: MockReportRepository(),
        },
        { provide: RoomRepository, useValue: MockRoomRepository },
      ],
    }).compile();
    reportService = module.get(ReportService);
    reportRepository = module.get(ReportRepository);
    roomRepository = module.get(RoomRepository);
  });

  it('should be defined', () => {
    expect(reportService).toBeDefined();
    expect(reportRepository).toBeDefined();
    expect(roomRepository).toBeDefined();
  });
});
