import { ReportRepository } from 'src/repositories/report.repository';
import { MockRepository } from './mock.repository';

export const MockReportRepository = (): MockRepository<ReportRepository> => ({});
