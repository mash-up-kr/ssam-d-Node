import { Tspec } from 'tspec';
import { ApiPageResponse, ApiResponse } from 'src/types/common';
import { ExceptionSpecWrap } from '../../types/tspec';
import { SignalReplyException } from '../../exceptions';
import { CrashReqDto } from './dto/crash-req.dto';
import { CrashResDto } from './dto/crash-res.dto';

type CrashApiSpec = Tspec.DefineApiSpec<{
  tags: ['크래시'];
  security: 'jwt';
  paths: {
    '/crashes': {
      get: {
        summary: '크래시 목록 불러오기';
        query: {
          pageNo: number;
          pageLength?: number;
        };
        responses: {
          200: ApiPageResponse<CrashResDto>;
        };
      };
    };
    '/crashes/{id}/reply': {
      post: {
        path: { id: number };
        summary: '크래시 답장';
        body: CrashReqDto;
        responses: { 201: ApiResponse; 500: ExceptionSpecWrap<SignalReplyException> };
      };
    };
  };
}>;
