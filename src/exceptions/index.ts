import { createException } from './exception.factory';
import { ExceptionType } from './exception.type';

const ExceptionOf = {
  USER: createException(ExceptionType.USER),
  INTERNAL: createException(ExceptionType.INTERNAL),
  EXTERNAL: createException(ExceptionType.EXTERNAL),
};

export class UserNotFoundException extends ExceptionOf.USER(400, '존재하지 않는 유저입니다.' as const) {}

export class NeedLoginException extends ExceptionOf.USER(401, '로그인이 필요합니다.' as const) {}

export class DuplicatedNicknameException extends ExceptionOf.USER(
  409 as const,
  '{{nickname}}은 이미 존재하는 닉네임입니다' as const
) {}
