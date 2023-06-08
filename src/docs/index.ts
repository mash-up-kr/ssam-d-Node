import { INestApplication } from '@nestjs/common';
import { Tspec, TspecDocsMiddleware } from 'tspec';

export async function InitApiDocMiddleware(app: INestApplication) {
  const apiParams: Tspec.GenerateParams = {};

  app.use('/docs', await TspecDocsMiddleware(apiParams));
}
