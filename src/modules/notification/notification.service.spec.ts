import { Test, TestingModule } from '@nestjs/testing';
import { NotificationService } from './notification.service';
import { ConfigService } from '@nestjs/config';
import { fcmMockData } from 'test/mock/data/fcm.data.mock';
describe('NotificationService', () => {
  let service: NotificationService;
  let configService: ConfigService;
  beforeEach(async () => {
    const configServiceMock = {
      get: jest.fn().mockReturnValue(fcmMockData),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotificationService, { provide: ConfigService, useValue: configServiceMock }],
    }).compile();

    service = module.get<NotificationService>(NotificationService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
