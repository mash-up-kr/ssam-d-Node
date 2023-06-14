import { Injectable } from '@nestjs/common';
import { UserOnboardingReqDto, UserReqDto } from './dto/user-req-dto';
import { UserKeywordRepository, UserRepository } from 'src/repositories';
import { KeywordsService } from '../keywords/keywords.service';
import { DuplicatedNicknameException, UserNotFoundException } from 'src/exceptions';

@Injectable()
export class UsersService {
  constructor(
    private readonly keywordsService: KeywordsService,
    private readonly userRepository: UserRepository,
    private readonly userKeywordRepository: UserKeywordRepository
  ) {}

  async findOne(userReqDto: UserReqDto) {
    const { email } = userReqDto;
    const user = await this.userRepository.get({ email });
    return user;
  }

  async isDuplicatedNickname(nickname: string) {
    const user = await this.userRepository.get({ nickname });
    if (user) {
      throw new DuplicatedNicknameException({ nickname });
    }
  }

  async saveOnboarding(userId: number, onboardingDto: UserOnboardingReqDto) {
    const user = await this.userRepository.get({ id: userId });
    if (!user) throw new UserNotFoundException();

    const { nickname, keywords: plainKeywords } = onboardingDto;

    await this.keywordsService.add(plainKeywords);
    const keywords = await this.keywordsService.getList(plainKeywords);
    const keywordIds = keywords.map(keyword => keyword.id);

    await this.userKeywordRepository.add(userId, keywordIds);
    await this.userRepository.update(userId, { nickname });
  }

  async updateAgreeAlarm(userId: number, agreeAlarm: boolean) {
    const user = await this.userRepository.get({ id: userId });
    if (!user) throw new UserNotFoundException();

    await this.userRepository.update(userId, { agreeAlarm });
  }
}
