import { createException } from './exception.factory';
import { ExceptionType } from './exception.type';

const ExceptionOf = {
  USER: createException(ExceptionType.USER),
  INTERNAL: createException(ExceptionType.INTERNAL),
  EXTERNAL: createException(ExceptionType.EXTERNAL),
};

export class UserNotFoundException extends ExceptionOf.USER(400, '존재하지 않는 유저입니다.' as const) {}

export class MatchingUserNotFoundException extends ExceptionOf.USER(400, '상대방이 존재하지 않습니다.' as const) {}

export class ChatNotFoundException extends ExceptionOf.USER(400, '채팅 메시지가 존재하지 않습니다.' as const) {}

export class NeedLoginException extends ExceptionOf.USER(401, '로그인이 필요합니다.' as const) {}

export class DuplicatedNicknameException extends ExceptionOf.USER(
  409 as const,
  '{{nickname}}은(는) 이미 존재하는 닉네임입니다' as const
) {}

export class KeywordExtractException extends ExceptionOf.INTERNAL(501, '키워드를 추출할 수 없습니다.' as const) {}

export class SignalNotFoundException extends ExceptionOf.USER(400, '존재하지 않는 시그널입니다.' as const) {}

export class RoomNotFoundException extends ExceptionOf.USER(400, '존재하지 않는 채팅방입니다.' as const) {}

export class SignalReplyException extends ExceptionOf.USER(501, '시그널을 답장할 수 없습니다.' as const) {}

export class SignalSenderMismatchException extends ExceptionOf.USER(
  501,
  '답장하려는 시그널이 올바르지 않습니다.' as const
) {}
export class CannotSendChatException extends ExceptionOf.USER(
  501,
  '해당 방에서 채팅을 보낼 수 있는 유저가 아닙니다.' as const
) {}

export class RoomIsDeadException extends ExceptionOf.USER(400, '상대방이 연결이 끊은 방입니다.' as const) {}

export class SignalSendException extends ExceptionOf.USER(500, '시그널을 보낼 수 없습니다.' as const) {}

export class DeviceTokenNotFoundException extends ExceptionOf.INTERNAL(
  500,
  '디바이스토큰 아이디가 존재하지 않습니다.' as const
) {}
