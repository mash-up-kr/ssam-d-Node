import { Tspec } from 'tspec';
import { UserOnboardingReqDto } from './dto/user-req-dto';
import { ApiResponse } from 'src/types/common';

type UsersApiSpec = Tspec.DefineApiSpec<{
  basePath: '/users';
  tags: ['유저'];
  paths: {
    '/alarm': {
      patch: {
        summary: '온보딩 과정 - 유저 정보 입력';
        body: UserOnboardingReqDto;
        responses: { 200: ApiResponse };
      };
    };
  };
}>;
