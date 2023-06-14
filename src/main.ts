import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './core/intercepters/response.intercepter';
import { InitApiDocMiddleware } from './docs';
import { RequestMethod } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CustomExceptionFilter } from './core/exception-filters/custom-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get('PORT');

  app.useGlobalFilters(new CustomExceptionFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.setGlobalPrefix('api', {
    exclude: [{ path: 'docs', method: RequestMethod.GET }],
  });

  await InitApiDocMiddleware(app, port);

  await app.listen(port);
}
bootstrap();
