import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  UseFilters,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { HttpExceptionFilter } from '../../filters/HttpException.filter';
import { UserNotFoundException } from '../../exceptions/UserNotFound.exception';
import { CreateUserDto } from '../../dto/CreateUser.dto';
import { UsersService } from '../../services/users/users.service';

@Controller('users')
export class UsersController {
  // constructor(private usersService : UsersService){}
  constructor(
    @Inject('USER_SERVICE') private readonly usersService: UsersService,
  ) {}

  @Get('')
  getUsers() {
    return this.usersService.getUsers();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/username/:username')
  getUsersByUsername(@Param('username') username: string) {
    return this.usersService.getUserByUsername(username);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseFilters(HttpExceptionFilter)
  @Get('/id/:id')
  getUsersById(@Param('id', ParseIntPipe) id: number) {
    const user = this.usersService.getUserById(id);
    if (!user) {
      throw new UserNotFoundException();
    }
    return user;
  }

  @Post('create')
  @UsePipes(ValidationPipe)
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }
}
