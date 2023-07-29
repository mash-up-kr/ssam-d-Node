import { Injectable } from '@nestjs/common';
import { PageReqDto } from 'src/common/dto/page-req-dto';
import { PageResDto } from 'src/common/dto/page-res-dto';
import { Transactional } from 'src/common/lazy-decorators/transactional.decorator';
import { CrashRepository } from 'src/repositories';
import { PrismaTransaction } from 'src/types/prisma.type';

@Injectable()
export class CrashService {
  constructor(private readonly crashRepository: CrashRepository) {}

  @Transactional()
  async getList(paging: PageReqDto, transaction: PrismaTransaction = null) {
    const { offset, limit } = paging;
    const crashes = await this.crashRepository.getList(offset, limit, transaction);
    const totalCount = await this.crashRepository.getCount(transaction);

    return { totalCount, list: crashes };
  }
}
