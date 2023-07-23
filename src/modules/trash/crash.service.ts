import { Injectable } from '@nestjs/common';
import { CrashRepository } from 'src/repositories';

@Injectable()
export class CrashService {
  constructor(private readonly trashRepository: CrashRepository) {}
}
