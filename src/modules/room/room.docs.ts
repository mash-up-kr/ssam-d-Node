import { Tspec } from 'tspec';
import { ApiResponse } from 'src/types/common';
import { RoomData, RoomWithChatData } from './room.type';

type RoomApiSpec = Tspec.DefineApiSpec<{
  basePath: '/rooms';
  tags: ['채팅방'];
  security: 'jwt';
  paths: {
    '/': {
      get: {
        summary: '채팅방 리스트 가져오기';
        responses: { 200: ApiResponse<RoomData[]> };
      };
    };
    '/{id}/chats': {
      get: {
        summary: '채팅방의 채팅 가져오기';
        responses: { 200: ApiResponse<RoomWithChatData> };
      };
    };
  };
}>;
