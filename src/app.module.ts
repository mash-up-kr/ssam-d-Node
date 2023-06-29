import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { KeywordsModule } from './modules/keywords/keywords.module';
import { SignalModule } from './modules/signal/signal.module';
import { LoggerMiddleware } from './core/intercepters/logging.interceptor';
import { LazyDecoratorModule } from './common/lazy-decorators/lazy-decorators.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `env.${process.env.NODE_ENV}`,
    }),
    PrismaModule,
    LazyDecoratorModule,
    UsersModule,
    AuthModule,
    KeywordsModule,
    SignalModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('/*');
  }
}
