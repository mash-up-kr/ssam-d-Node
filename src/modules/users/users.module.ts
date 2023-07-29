import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { KeywordRepository, UserKeywordRepository, UserRepository } from 'src/repositories';
import { SignalModule } from '../signal/signal.module';

@Module({
  imports: [SignalModule],
  controllers: [UsersController],
  providers: [UsersService, UserRepository, UserKeywordRepository, KeywordRepository],
})
export class UsersModule {}
