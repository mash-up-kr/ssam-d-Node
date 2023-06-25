import { Injectable } from '@nestjs/common';
import { TrashRepository } from 'src/repositories';
import { SignalReqDto } from '../signal/dto/signal-req-dto';

@Injectable()
export class TrashService {
  constructor(private readonly trashRepository: TrashRepository) {}
}
