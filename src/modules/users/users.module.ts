import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { KeywordRepository, UserKeywordRepository, UserRepository } from 'src/repositories';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UserRepository, UserKeywordRepository, KeywordRepository],
})
export class UsersModule {}
