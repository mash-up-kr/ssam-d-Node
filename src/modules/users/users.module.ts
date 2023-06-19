import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { KeywordRepository, UserKeywordRepository, UserRepository } from 'src/repositories';
import { KeywordsModule } from '../keywords/keywords.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UserRepository, UserKeywordRepository, KeywordRepository],
  imports: [KeywordsModule],
})
export class UsersModule {}
