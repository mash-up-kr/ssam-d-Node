export class Report {
  readonly id: number;
  readonly content: string;
  readonly roomId: number;
  readonly reportingUserId: number;
  readonly reportedUserId: number;
  readonly createdAt: Date;

  constructor(report: Partial<Report>) {
    this.id = report.id;
    this.content = report.content;
    this.roomId = report.roomId;
    this.reportingUserId = report.reportingUserId;
    this.reportedUserId = report.reportedUserId;
    this.createdAt = report.createdAt;
  }
}
