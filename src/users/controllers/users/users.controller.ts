import { ClassSerializerInterceptor, Controller, Get, Inject, Param, UseInterceptors } from '@nestjs/common';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {

    // constructor(private usersService : UsersService){}
    constructor (@Inject("USER_SERVICE") private readonly usersService:UsersService){}
    @Get('')
    getUsers(){
        return this.usersService.getUsers()
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get('/:username')
    getUsersByUsername(@Param('username')  username: string){
        return this.usersService.getUserByUsername(username)
    }
}
