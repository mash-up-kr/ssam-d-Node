import { Test, TestingModule } from '@nestjs/testing';
import { SignalNotificationService } from './services/signal-notification.service';
xdescribe('NotificationService', () => {
  let service: SignalNotificationService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [],
    }).compile();

    service = module.get<SignalNotificationService>(SignalNotificationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
