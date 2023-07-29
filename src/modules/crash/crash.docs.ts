import { Tspec } from 'tspec';
import { ApiPageResponse, ApiResponse } from 'src/types/common';
import { ExceptionSpecWrap } from '../../types/tspec';
import { SignalReplyException } from '../../exceptions';
import { CrashResDto } from './dto/crash-res.dto';
import { SignalReqDto } from '../signal/dto/signal-req-dto';

type CrashApiSpec = Tspec.DefineApiSpec<{
  tags: ['크래시'];
  security: 'jwt';
  paths: {
    '/signal': {
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
  };
}>;
