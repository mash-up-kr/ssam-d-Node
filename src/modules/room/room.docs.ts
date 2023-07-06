import { Tspec } from 'tspec';
import { ApiResponse } from 'src/types/common';
import { RoomData, RoomWithChat } from './room.type';

type RoomApiSpec = Tspec.DefineApiSpec<{
  tags: ['채팅방'];
  security: 'jwt';
  paths: {
    '/rooms': {
      get: {
        summary: '채팅방 리스트 가져오기';
        responses: { 200: ApiResponse<RoomData[]> };
      };
    };
    '/rooms/{id}/chats': {
      get: {
        summary: '채팅방의 채팅 가져오기';
        responses: { 200: ApiResponse<RoomWithChat> };
      };
    };
  };
}>;
