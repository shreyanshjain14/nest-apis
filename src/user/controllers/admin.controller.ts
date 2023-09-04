import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { UserService } from '../user.service';
import { LoginDto } from '../dto/create-user.dto';
//import { UpdateUserDto } from './dto/update-user.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async adminLogin(@Body() createUserDto: LoginDto) {
    return await this.userService.login(createUserDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }
}
