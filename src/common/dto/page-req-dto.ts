import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class PageReqDto {
  /**
   *@requires false
   * @type {number}
   */
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsNotEmpty()
  pageNo: number;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  pageLength?: number;

  offset(): number {
    if (this.pageLength < 1 || this.pageLength === null || this.pageLength === undefined) {
      this.pageLength = 10;
    }

    return (Number(this.pageNo) - 1) * Number(this.pageLength);
  }

  limit(): number {
    if (this.pageLength < 1 || this.pageLength === null || this.pageLength === undefined) {
      this.pageLength = 10;
    }
    return Number(this.pageLength);
  }
  constructor(pageNo: number, pageLength: number) {
    this.pageNo = pageNo;
    this.pageLength = pageLength ?? 10;
  }
}
