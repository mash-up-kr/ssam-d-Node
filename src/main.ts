import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './core/intercepters/response.intercepter';
import { InitApiDocMiddleware } from './docs';
import { RequestMethod } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CustomExceptionFilter } from './core/exception-filters/custom-exception.filter';
import * as dotenv from 'dotenv';
import { IS_LOCAL } from './common/constants';

declare const module: any;

async function bootstrap() {
  if (IS_LOCAL) {
    dotenv.config({ path: '.env.local' });
  }
  const app = await NestFactory.create(AppModule, { cors: true });

  const configService = app.get(ConfigService);
  const port = configService.get('PORT');

  app.useGlobalFilters(new CustomExceptionFilter(configService));
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.setGlobalPrefix('api', {
    exclude: [{ path: 'docs', method: RequestMethod.GET }],
  });

  await InitApiDocMiddleware(app, port);

  await app.listen(port);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
