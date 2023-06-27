import { Tspec } from 'tspec';
import { ApiResponse } from 'src/types/common';
import { SignalReqDto } from './dto/signal-req-dto';
import { SignalResDto } from './dto/signal-res-dto';

type SignalApiSpec = Tspec.DefineApiSpec<{
  basePath: '/signal';
  tags: ['시그널'];
  paths: {
    '/send': {
      post: {
        security: 'jwt';
        summary: '시그널 보내기';
        body: SignalReqDto;
        responses: { 201: ApiResponse };
      };
    };
    '/': {
      get: {
        security: 'jwt';
        summary: '시그널 목록 불러오기';
        responses: { 200: ApiResponse<SignalResDto> };
      };
    };
  };
}>;
