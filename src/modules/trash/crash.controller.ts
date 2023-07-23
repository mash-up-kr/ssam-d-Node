import { Controller } from '@nestjs/common';
import { CrashService } from './crash.service';

@Controller('trash')
export class CrashController {
  constructor(private readonly crashService: CrashService) {}
}
