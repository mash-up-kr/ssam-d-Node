import { PickType } from '@nestjs/mapped-types';
import { SignalReqDto } from 'src/modules/signal/dto/signal-req-dto';

export class RoomChatReqDto extends PickType(SignalReqDto, ['content']) {}
