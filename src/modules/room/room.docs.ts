import { Tspec } from 'tspec';
import { ApiResponse } from 'src/types/common';
import { RoomData, RoomWithChat } from './room.type';
import { SignalReqDto } from '../signal/dto/signal-req-dto';

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
        responses: { 200: ApiResponse<RoomWithChat> };
      };
      post: {
        path: { id: number };
        summary: '채팅방에서 챗 보내기';
        body: Pick<SignalReqDto, 'content'>;
        responses: { 201: ApiResponse };
      };
    };
  };
}>;
