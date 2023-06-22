import { Injectable } from '@nestjs/common';
import { SignalRepository } from 'src/repositories';
@Injectable()
export class SignalService {
  constructor(private readonly signalRepository: SignalRepository) {}
}
