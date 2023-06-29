import { Tspec } from 'tspec';
import { ApiResponse } from 'src/types/common';
import { SignalReqDto } from './dto/signal-req-dto';
import { SignalResDto } from './dto/signal-res-dto';

type SignalApiSpec = Tspec.DefineApiSpec<{
  basePath: '/signal';
  tags: ['시그널'];
  security: 'jwt';
  paths: {
    '/send': {
      post: {
        summary: '시그널 보내기';
        body: SignalReqDto;
        responses: { 201: ApiResponse };
      };
    };
    '/{id}/reply': {
      post: {
        path: { id: number };
        summary: '첫 시그널 답장';
        body: Pick<SignalReqDto, 'content'>;
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
