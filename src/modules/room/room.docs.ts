import { Tspec } from 'tspec';
import { ApiResponse } from 'src/types/common';
import { RoomResDto } from './dto/room-res-dto';

type RoomApiSpec = Tspec.DefineApiSpec<{
  basePath: '/room';
  tags: ['채팅방'];
  security: 'jwt';
  paths: {
    '': {
      get: {
        summary: '채티방 리스트 가져오기';
        responses: { 201: ApiResponse<RoomResDto> };
      };
    };
  };
}>;
