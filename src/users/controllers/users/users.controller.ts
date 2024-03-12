import { Body, ClassSerializerInterceptor, Controller, Get, Inject, Param, ParseIntPipe, Post, UseFilters, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { Http2ServerRequest } from 'http2';
import { CreateUserDto } from 'src/users/dto/CreateUser.dto';
import { UserNotFoundException } from 'src/users/exceptions/UserNotFound.exception';
import { HttpExceptionFilter } from 'src/users/filters/HttpException.filter';
import { UsersService } from 'src/users/services/users/users.service';
import { SerializedUser } from 'src/users/types/User';

@Controller('users')
export class UsersController {

    // constructor(private usersService : UsersService){}
    constructor (@Inject("USER_SERVICE") private readonly usersService:UsersService){}
    
    @Get('')
    getUsers(){
        return this.usersService.getUsers()
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get('/username/:username')
    getUsersByUsername(@Param('username')  username: string){
        return this.usersService.getUserByUsername(username)
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @UseFilters(HttpExceptionFilter)
    @Get('/id/:id')
    getUsersById(@Param('id',ParseIntPipe)  id: number){
        const user = this.usersService.getUserById(id)
        if(!user){
            throw new UserNotFoundException();
        }
         return user
    }

    @Post("create")
    @UsePipes(ValidationPipe)
    createUser(@Body() createUserDto: CreateUserDto){
        
    return this.usersService.createUser(createUserDto)
    }
}
