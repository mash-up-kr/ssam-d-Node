import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient, Prisma } from '@prisma/client';
import { DMMF } from '@prisma/client/runtime';
import { IS_LOCAL } from 'src/common/constants';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({
      log: IS_LOCAL ? ['error', 'info', 'query', 'warn'] : [],
    });
  }
  async onModuleInit(): Promise<void> {
    setSoftDeleteMiddleware(this);
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication): Promise<void> {
    this.$on('beforeExit', async () => {
      return await app.close();
    });
  }
}

/**
 * @description
 * soft delete를 위한 middleware 설정
 * https://www.prisma.io/docs/concepts/components/prisma-client/middleware/soft-delete-middleware#step-3-optionally-prevent-readupdate-of-soft-deleted-records
 */
const setSoftDeleteMiddleware = (prisma: PrismaClient) => {
  prisma.$use(async (params, next) => {
    const models = Prisma.dmmf.datamodel.models;
    const modelNames = models.map(model => model.name);
    if (modelNames.includes(params.model) && isSoftDeleteEnabled(params.model, models)) {
      if (['findMany', 'findUnique', 'findFirst', 'update', 'updateMany'].includes(params.action)) {
        if (params.action === 'update') {
          params.action = 'updateMany';
        }
        params.args.where = { deletedAt: null, ...params.args.where };
      } else if (params.action === 'delete') {
        params.action = 'update';
        params.args['data'] = { deletedAt: new Date() };
      } else if (params.action === 'deleteMany') {
        params.action = 'updateMany';
        params.args.data = { deletedAt: new Date(), ...params.args.data };
      }
    }
    return next(params);
  });
};

const isSoftDeleteEnabled = (modelName: string, modelData: DMMF.Model[]): boolean => {
  return modelData
    .find(model => model.name == modelName)
    .fields.map(filed => filed.name)
    .includes('deletedAt');
};
