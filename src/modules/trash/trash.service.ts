import { Injectable } from '@nestjs/common';
import { TrashRepository } from 'src/repositories';

@Injectable()
export class TrashService {
  constructor(private readonly trashRepository: TrashRepository) {}
}
