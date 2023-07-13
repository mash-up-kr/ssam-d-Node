import { IsOptional, IsString, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class PageReqDto {
  /**
   *@requires false
   * @type {number}
   */
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsOptional()
  pageNo: number = 1;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  pageLength?: number = 3;
}
