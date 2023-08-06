import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { KeywordRepository, UserKeywordRepository, UserRepository } from 'src/repositories';
import { SignalModule } from '../signal/signal.module';
import { RoomModule } from '../room/room.module';

@Module({
  imports: [SignalModule, RoomModule],
  controllers: [UsersController],
  providers: [UsersService, UserRepository, UserKeywordRepository, KeywordRepository],
})
export class UsersModule {}
