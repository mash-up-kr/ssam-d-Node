import { Tspec } from 'tspec';
import { ApiPageResponse, ApiResponse } from 'src/types/common';
import { SignalReqDto } from '../signal/dto/signal-req-dto';
import { RoomDetailResDto } from './dto/room-detail-res-dto';
import { ChatResDto } from '../chat/dto/chat-res-dto';
import { ChatDetailResDto } from '../chat/dto/chat-detail-res-dto';
import { RoomResDto } from './dto/room-res-dto';
import {
  CannotSendChatException,
  MatchingUserNotFoundException,
  RoomNotFoundException,
  UserNotFoundException,
} from '../../exceptions';
import { ExceptionSpecWrap } from '../../types/tspec';

type RoomApiSpec = Tspec.DefineApiSpec<{
  tags: ['채팅방'];
  security: 'jwt';
  paths: {
    '/rooms': {
      get: {
        summary: '채팅방 리스트 가져오기';
        query: {
          pageNo: number;
          pageLength?: number;
        };
        responses: { 200: ApiPageResponse<RoomResDto>; 400: ExceptionSpecWrap<MatchingUserNotFoundException> };
      };
    };
    '/rooms/{id}': {
      get: {
        path: { id: number };
        summary: '채팅방 정보 가져오기';
        responses: { 200: ApiResponse<RoomDetailResDto>; 400: ExceptionSpecWrap<RoomNotFoundException> };
      };
    };
    '/rooms/{id}/chats': {
      get: {
        path: { id: number };
        query: {
          pageNo: number;
          pageLength?: number;
        };
        summary: '채팅방의 채팅목록 가져오기';
        responses: { 200: ApiPageResponse<ChatResDto>; 400: ExceptionSpecWrap<MatchingUserNotFoundException> };
      };
      post: {
        path: { id: number };
        summary: '채팅방에서 챗 보내기';
        body: Pick<SignalReqDto, 'content'>;
        responses: { 201: ApiResponse; 501: ExceptionSpecWrap<CannotSendChatException> };
      };
    };
    '/rooms/{roomId}/chats/{chatId}': {
      get: {
        path: { roomId: number; chatId: number };
        summary: '채팅메시지 상세 조회';
        responses: {
          200: ApiResponse<ChatDetailResDto>;
          400: [MatchingUserNotFoundException, ExceptionSpecWrap<UserNotFoundException>];
        };
      };
    };
    '/rooms/{roomId}': {
      delete: {
        path: { roomId: number };
        summary: '채팅방 나가기';
        responses: {
          200: ApiResponse;
        };
      };
    };
  };
}>;
