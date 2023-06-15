import { Tspec } from 'tspec';
import { UserNicknameReqDto, UserOnboardingReqDto } from './dto/user-req-dto';
import { ApiResponse } from 'src/types/common';
import { UserNotFoundException } from 'src/exceptions';
import { ExceptionSpecWrap, QuerySpecWrap } from 'src/types/tspec';

type UsersApiSpec = Tspec.DefineApiSpec<{
  basePath: '/users';
  tags: ['유저'];
  security: 'jwt';
  paths: {
    '/nickname/duplication': {
      get: {
        summary: '유저 닉네임 중복 체크';
        query: QuerySpecWrap<UserNicknameReqDto>;
        responses: { 200: ApiResponse; 409: ApiResponse };
      };
    };
    '/onboarding': {
      patch: {
        summary: '온보딩 과정 - 유저 정보 입력';

        body: UserOnboardingReqDto;
        responses: { 200: ApiResponse; 400: ExceptionSpecWrap<UserNotFoundException> };
      };
    };
    '/alarm': {
      patch: {
        summary: '유저 알림 설정';
        body: {
          agreeAlarm: boolean;
        };
        responses: { 200: ApiResponse; 400: ExceptionSpecWrap<UserNotFoundException> };
      };
    };
  };
}>;
