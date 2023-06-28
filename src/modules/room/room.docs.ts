import { Tspec } from 'tspec';
import { ApiResponse } from 'src/types/common';
import { RoomResDto } from './dto/room-res-dto';
import { RoomData, RoomWithChatData } from './room.type';

type RoomApiSpec = Tspec.DefineApiSpec<{
  basePath: '/rooms';
  tags: ['채팅방'];
  security: 'jwt';
  paths: {
    '': {
      get: {
        summary: '연결된 방 리스트 가져오기';
        responses: { 200: ApiResponse<RoomData[]> };
      };
    };
    '{id}/chats': {
      get: {
        summary: '연결된 방에 있는 채팅 가져오기';
        responses: { 200: ApiResponse<RoomWithChatData> };
      };
    };
  };
}>;
