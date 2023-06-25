import { Controller } from '@nestjs/common';
import { TrashService } from './trash.service';

@Controller('trash')
export class TrashController {
  constructor(private readonly trashService: TrashService) {}
}
