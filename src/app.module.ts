import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { KeywordsModule } from './modules/keywords/keywords.module';
import { SignalModule } from './modules/signal/signal.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `env.${process.env.NODE_ENV}`,
    }),
    PrismaModule,
    UsersModule,
    AuthModule,
    KeywordsModule,
    SignalModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
