import { Injectable } from '@nestjs/common';
import { UserOnboardingReqDto, UserReqDto } from './dto/user-req-dto';
import { UserKeywordRepository, UserRepository } from 'src/repositories';
import { KeywordsService } from '../keywords/keywords.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly keywordsService: KeywordsService,
    private readonly userRepository: UserRepository,
    private readonly userKeywordRepository: UserKeywordRepository
  ) {}

  async findOne(userReqDto: UserReqDto) {
    const { email } = userReqDto;
    const user = await this.userRepository.get({ where: { email } });
    return user;
  }

  async saveOnboarding(userId: number, onboardingDto: UserOnboardingReqDto) {
    const { nickname, keywords: plainKeywords } = onboardingDto;

    await this.keywordsService.add(plainKeywords);
    const keywords = await this.keywordsService.getList(plainKeywords);
    const keywordIds = keywords.map(keyword => keyword.id);

    await this.userRepository.update(userId, { nickname });
    await this.userKeywordRepository.add(userId, keywordIds);
  }

  async updateAgreeAlarm(userId: number, agreeAlarm: boolean) {
    await this.userRepository.update(userId, { agreeAlarm });
  }
}
