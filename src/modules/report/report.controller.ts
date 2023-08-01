import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guards/jwt.auth.guard';
import { AuthUser } from 'src/common/decorators/auth-user.decorator';
import { ReportService } from './report.service';
import { ReportReqDto } from './dto/report-req-dto';

@UseGuards(AuthGuard)
@Controller('reports')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post('')
  async submitReport(@AuthUser() userId: number, @Body() reportReqDto: ReportReqDto) {
    await this.reportService.submitReport(userId, reportReqDto);
  }
}
