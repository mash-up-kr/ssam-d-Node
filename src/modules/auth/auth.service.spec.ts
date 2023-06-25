import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { DeviceTokenRepository, UserRepository } from 'src/repositories';
import { MockUserRepository } from 'test/mock/repositories';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { MockDeviceTokenRepository } from 'test/mock/repositories/mock-device-token.repository';

describe('AuthService', () => {
  let service: AuthService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule, ConfigModule],
      providers: [
        AuthService,
        { provide: UserRepository, useValue: MockUserRepository() },
        { provide: DeviceTokenRepository, useValue: MockDeviceTokenRepository() },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userRepository = module.get(UserRepository);

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userRepository).toBeDefined();
  });
});
