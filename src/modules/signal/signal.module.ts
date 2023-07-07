import { Module } from '@nestjs/common';
import { SignalService } from './signal.service';
import { SignalController } from './signal.controller';
import {
  ChatRepository,
  RoomRepository,
  RoomUserRepository,
  SignalRepository,
  TrashRepository,
  UserKeywordRepository,
} from 'src/repositories';
import { PageReqDto } from 'src/common/page/page-req-dto';
import { KeywordsModule } from '../keywords/keywords.module';

@Module({
  controllers: [SignalController],
  imports: [KeywordsModule],
  providers: [
    SignalService,
    SignalRepository,
    TrashRepository,
    RoomRepository,
    RoomUserRepository,
    UserKeywordRepository,
    ChatRepository,
    PageReqDto,
  ],
})
export class SignalModule {}
