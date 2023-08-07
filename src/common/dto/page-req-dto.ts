import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class PageReqDto {
  /**
   *@requires false
   * @type {number}
   */
  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  pageNo: number;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  pageLength?: number;

  get offset(): number {
    if (this.pageLength < 1 || this.pageLength === null || this.pageLength === undefined) {
      this.pageLength = 10;
    }

    return (Number(this.pageNo) - 1) * Number(this.pageLength);
  }

  get limit(): number {
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
