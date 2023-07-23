import { Tspec } from 'tspec';
import { ApiResponse } from 'src/types/common';
import { KeywordExtractException } from 'src/exceptions';
import { ExceptionSpecWrap } from 'src/types/tspec';
import { KeywordReqDto } from './dto/keyword-req.dto';

type KeywordsApiSpec = Tspec.DefineApiSpec<{
  tags: ['키워드'];
  security: 'jwt';
  paths: {
    '/keywords/recommend': {
      get: {
        summary: '키워드 추출 및 추천';
        query: {
          content: string;
        };
        responses: { 200: ApiResponse; 500: ExceptionSpecWrap<KeywordExtractException> };
      };
    };
    '/keywords': {
      get: {
        summary: '내가 등록한 키워드 목록';
        responses: { 201: ApiResponse<string[]> };
      };
      post: {
        summary: '키워드 유저에게 등록';
        body: KeywordReqDto;
        responses: { 201: ApiResponse };
      };
    };
  };
}>;
