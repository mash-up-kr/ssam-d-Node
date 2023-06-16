import { INestApplication } from '@nestjs/common';
import { Tspec, TspecDocsMiddleware } from 'tspec';

export async function InitApiDocMiddleware(app: INestApplication, port: number | string) {
  const apiParams: Tspec.GenerateParams = {
    openapi: {
      title: '쌈디 - API 문서',
      servers: [
        { url: `http://localhost:${port}/api`, description: '로컬서버' },
        { url: `http://49.50.166.183:30000/api`, description: '개발서버' },
      ],
      securityDefinitions: {
        jwt: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  };

  app.use('/docs', await TspecDocsMiddleware(apiParams));
}
