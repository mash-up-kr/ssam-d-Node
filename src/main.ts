import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './core/intercepters/response.intercepter';
import { InitApiDocMiddleware } from './docs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new ResponseInterceptor());

  await InitApiDocMiddleware(app);

  await app.listen(3000);
}
bootstrap();
