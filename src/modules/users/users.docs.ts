import { Tspec } from 'tspec';
import { UserNicknameReqDto } from './dto/user-req-dto';
import { ApiPageResponse, ApiResponse } from 'src/types/common';
import { SignalNotFoundException, UserNotFoundException } from 'src/exceptions';
import { ExceptionSpecWrap, QuerySpecWrap } from 'src/types/tspec';
import { UserResDto } from './dto/user-res-dto';
import { SentSignalResDto } from '../signal/dto/sent-signal-res-dto';
import { SentSignalDetailResDto } from '../signal/dto/sent-signal-detail-res-dto';

type UsersApiSpec = Tspec.DefineApiSpec<{
  basePath: '/users';
  tags: ['유저'];
  security: 'jwt';
  paths: {
    '/nickname/duplication': {
      get: {
        summary: '유저 닉네임 중복 체크';
        query: QuerySpecWrap<UserNicknameReqDto>;
        responses: { 200: ApiResponse; 409: ApiResponse };
      };
    };
    '/nickname': {
      patch: {
        summary: '온보딩 과정 - 유저 닉네임 입력';
        body: UserNicknameReqDto;
        responses: { 200: ApiResponse; 400: ExceptionSpecWrap<UserNotFoundException> };
      };
    };
    '/alarm': {
      patch: {
        summary: '유저 알림 설정';
        body: {
          agreeAlarm: boolean;
        };
        responses: { 200: ApiResponse; 400: ExceptionSpecWrap<UserNotFoundException> };
      };
    };
    '/{id}': {
      delete: {
        summary: '유저 삭제';
        path: { id: number };
        responses: { 200: ApiResponse; 400: ExceptionSpecWrap<UserNotFoundException> };
      };
      get: {
        summary: '유저 정보 조회';
        path: { id: number };
        responses: { 200: ApiResponse<UserResDto>; 400: ExceptionSpecWrap<UserNotFoundException> };
      };
    };
    '/signals': {
      get: {
        summary: '보낸 시그널 리스트 페이징 조회';
        query: {
          pageNo: number;
          pageLength?: number;
        };
        responses: { 200: ApiPageResponse<SentSignalResDto> };
      };
    };
    '/signals/{id}': {
      get: {
        summary: '보낸 시그널 상세 조회';
        path: { id: number };
        responses: { 200: ApiResponse<SentSignalDetailResDto>; 400: ExceptionSpecWrap<SignalNotFoundException> };
      };
    };
  };
}>;
