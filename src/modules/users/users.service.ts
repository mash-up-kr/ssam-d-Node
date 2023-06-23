import { Injectable } from '@nestjs/common';
import { UserNicknameReqDto, UserReqDto } from './dto/user-req-dto';
import { UserRepository } from 'src/repositories';
import { DuplicatedNicknameException, UserNotFoundException } from 'src/exceptions';
import { User } from 'src/domains/user';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async findOne(userReqDto: UserReqDto): Promise<User> {
    const { email } = userReqDto;
    const user = await this.userRepository.get({ email });
    return user;
  }

  async isDuplicatedNickname(nickname: string): Promise<void> {
    const user = await this.userRepository.get({ nickname });
    if (user) {
      throw new DuplicatedNicknameException({ nickname });
    }
  }

  async updateNickname(userId: number, userNicknameDto: UserNicknameReqDto): Promise<void> {
    const user = await this.userRepository.get({ id: userId });
    if (!user) throw new UserNotFoundException();

    const { nickname } = userNicknameDto;
    await this.isDuplicatedNickname(nickname);
    await this.userRepository.update(userId, { nickname });
  }

  async updateAgreeAlarm(userId: number, agreeAlarm: boolean): Promise<void> {
    const user = await this.userRepository.get({ id: userId });
    if (!user) throw new UserNotFoundException();

    await this.userRepository.update(userId, { agreeAlarm });
  }
}
