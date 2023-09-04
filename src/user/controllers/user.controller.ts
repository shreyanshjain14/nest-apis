import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';

import { Validate, validate } from '@nestjs/class-validator';
import { UserService } from '../user.service';
import { LoginDto } from '../dto/create-user.dto';
import { jwtGuard } from '../guards/jwtGuard';

//import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(@Body() createUserDto: LoginDto) {
    return await this.userService.login(createUserDto);
  }

  @Get('products')
  @UseGuards(jwtGuard)
  findAll() {
    return this.userService.findAllProducts();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
