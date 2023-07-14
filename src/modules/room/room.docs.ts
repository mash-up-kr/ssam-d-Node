import { Tspec } from 'tspec';
import { ApiResponse } from 'src/types/common';
import { RoomData, RoomWithChat } from './room.type';
import { SignalReqDto } from '../signal/dto/signal-req-dto';
import { RoomResDto } from './dto/room-res-dto';

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
        path: { id: number };
        summary: '채팅방의 채팅목록 가져오기';
        responses: { 200: ApiResponse<RoomWithChat> };
      };
      post: {
        path: { id: number };
        summary: '채팅방에서 챗 보내기';
        body: Pick<SignalReqDto, 'content'>;
        responses: { 201: ApiResponse };
      };
    };
    '/rooms/{roomId}/chats/{chatId}': {
      get: {
        path: { roomId: number; chatId: number };
        summary: '채팅메시지 상세 조회';
        responses: { 200: ApiResponse<RoomResDto> };
      };
    };
  };
}>;
