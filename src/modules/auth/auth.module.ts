import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { DeviceTokenRepository, UserKeywordRepository, UserRepository } from 'src/repositories';

@Module({
  imports: [
    JwtModule.register({
      global: true,
    }),
  ],
  providers: [AuthService, UserRepository, UserKeywordRepository, DeviceTokenRepository],
  controllers: [AuthController],
})
export class AuthModule {}
