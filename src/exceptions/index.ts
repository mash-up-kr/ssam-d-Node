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
  '{{nickname}}은(는) 이미 존재하는 닉네임입니다' as const
) {}

export class KeywordExtractException extends ExceptionOf.INTERNAL(500, '키워드를 추출할 수 없습니다.' as const) {}

export class SignalNotFoundException extends ExceptionOf.USER(400, '존재하지 않는 시그널입니다.' as const) {}

export class SignalSenderMismatchException extends ExceptionOf.USER(
  500,
  '답장하려는 시그널이 올바르지 않습니다.' as const
) {}
