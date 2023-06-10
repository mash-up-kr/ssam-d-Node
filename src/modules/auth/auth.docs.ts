import { Tspec } from 'tspec';
import { LoginReqDto } from './dto/login-req-dto';
import { ApiResponse } from 'src/types/common';
import { LoginResDto } from './dto/login-res-dto';

type AuthApiSpec = Tspec.DefineApiSpec<{
  basePath: '/users';
  tags: ['유저'];
  paths: {
    '/login': {
      patch: {
        summary: '카카오 로그인';
        body: LoginReqDto;
        responses: { 200: LoginResDto };
      };
    };
  };
}>;
