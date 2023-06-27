import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { DeviceTokenRepository, UserRepository } from 'src/repositories';
import { MockUserRepository } from 'test/mock/repositories';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MockDeviceTokenRepository } from 'test/mock/repositories/mock-device-token.repository';
import { User } from 'src/domains/user';

describe('AuthService', () => {
  let service: AuthService;
  let configService: ConfigService;
  let userRepository: ReturnType<typeof MockUserRepository>;
  let deviceTokenRepository: ReturnType<typeof MockDeviceTokenRepository>;
  let configSpy: jest.SpyInstance;

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
    deviceTokenRepository = module.get(DeviceTokenRepository);

    configService = module.get<ConfigService>(ConfigService);
    configSpy = jest.spyOn(configService, 'get');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userRepository).toBeDefined();
    expect(deviceTokenRepository).toBeDefined();
  });

  describe('회원가입/로그인 테스트', () => {
    const loginReqDto = {
      socialId: '1',
      provider: 'KAKAO',
      email: 'test@test.com',
      deviceToken: 'device_token',
    };
    it('유저가 처음 가입할 때', async () => {
      userRepository.get.mockResolvedValueOnce(null);
      userRepository.get.mockResolvedValueOnce(null);
      configSpy.mockReturnValueOnce('JWT_SECRET');
      configSpy.mockReturnValueOnce('1m');
      configSpy.mockReturnValueOnce('JWT_REFRESH_SECRET');
      configSpy.mockReturnValueOnce('1m');
      const saveSpyOnUserRepository = jest.spyOn(userRepository, 'save').mockResolvedValueOnce({ id: 1 });

      const result = await service.login(loginReqDto);

      expect(configSpy).toHaveBeenCalledWith('JWT_SECRET');
      expect(configSpy).toHaveBeenCalledWith('TOKEN_EXPRED_TIME');
      expect(configSpy).toHaveBeenCalledWith('JWT_REFRESH_SECRET');
      expect(configSpy).toHaveBeenCalledWith('REFRESH_TOKEN_EXPRED_TIME');
      expect(saveSpyOnUserRepository).toHaveBeenCalledTimes(1);

      expect(result.userId).toBeTruthy();
      expect(result.accessToken).toBeTruthy();
      expect(result.refreshToken).toBeTruthy();
    });

    it('이미 가입한 유저일 때', async () => {
      configSpy.mockReturnValueOnce('JWT_SECRET');
      configSpy.mockReturnValueOnce('1m');
      configSpy.mockReturnValueOnce('JWT_REFRESH_SECRET');
      configSpy.mockReturnValueOnce('1m');

      const savedUser = new User({ id: 1, ...loginReqDto });
      userRepository.get.mockResolvedValueOnce(savedUser);

      const result = await service.login(loginReqDto);
      expect(result.userId).toBeTruthy();
      expect(result.accessToken).toBeTruthy();
      expect(result.refreshToken).toBeTruthy();
    });
  });
});
