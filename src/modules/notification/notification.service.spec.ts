import { Test, TestingModule } from '@nestjs/testing';
import { NotificationService } from './notification.service';
xdescribe('NotificationService', () => {
  let service: NotificationService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [],
    }).compile();

    service = module.get<NotificationService>(NotificationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
