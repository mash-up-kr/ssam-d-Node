import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserReqDto } from './dto/user-req-dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  findAll() {
    return this.usersService.findAll();
  }
  @Post()
  create(@Body() userReqDto: UserReqDto) {
    return this.usersService.create(userReqDto);
  }
}
