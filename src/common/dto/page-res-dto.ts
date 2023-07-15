import { IsArray } from 'class-validator';
import { SignalResDto } from 'src/modules/signal/dto/signal-res-dto';

export class PageResDto<T> {
  /**
   * 페이지길이
   * @readonly
   * @type {number}
   * @example 3
   */
  readonly pageLength: number;

  /**
   *
   *총 페이지 개수
   * @readonly
   * @type {number}
   * @example 2
   */
  readonly totalPage: number;

  /**
   *시그널 정보 목록
   * @readonly
   * @type {T[]}
   *
   *
   */

  @IsArray()
  readonly list: T[];

  constructor(totalCount: number, pageLength: number, list: T[]) {
    this.pageLength = pageLength;
    this.totalPage = Math.ceil(totalCount / pageLength);
    this.list = list;
  }
}
