import { Tspec } from 'tspec';
import { ApiPageResponse, ApiResponse } from 'src/types/common';
import { SignalReqDto } from './dto/signal-req-dto';
import { SignalResDto } from './dto/signal-res-dto';
import { ExceptionSpecWrap } from '../../types/tspec';
import { SignalNotFoundException, SignalSenderMismatchException } from '../../exceptions';

type SignalApiSpec = Tspec.DefineApiSpec<{
  tags: ['시그널'];
  security: 'jwt';
  paths: {
    '/signal/send': {
      post: {
        summary: '시그널 보내기';
        body: SignalReqDto;
        responses: { 201: ApiResponse };
      };
    };
    '/signal/{id}/reply': {
      post: {
        path: { id: number };
        summary: '첫 시그널 답장';
        body: Pick<SignalReqDto, 'content'>;
        responses: { 201: ApiResponse };
      };
    };
    '/signal': {
      get: {
        summary: '시그널 목록 불러오기';
        query: {
          pageNo: number;
          pageLength?: number;
        };
        responses: {
          200: ApiPageResponse<SignalResDto>;
          400: ExceptionSpecWrap<SignalNotFoundException>;
          500: ExceptionSpecWrap<SignalSenderMismatchException>;
        };
      };
    };
  };
}>;
