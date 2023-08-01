import { Tspec } from 'tspec';
import { ApiResponse } from 'src/types/common';
import { ExceptionSpecWrap } from '../../types/tspec';
import { RoomNotFoundException } from '../../exceptions';
import { ReportReqDto } from './dto/report-req-dto';

type ReportApiSpec = Tspec.DefineApiSpec<{
  tags: ['신고'];
  security: 'jwt';
  paths: {
    '/reports': {
      post: {
        summary: '신고하기';
        body: ReportReqDto;
        responses: { 201: ApiResponse; 400: ExceptionSpecWrap<RoomNotFoundException> };
      };
    };
  };
}>;
