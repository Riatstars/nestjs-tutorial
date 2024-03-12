import { Inject, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { UsersService } from 'src/users/services/users/users.service';
import { SerializedUser } from 'src/users/types/User';
import { comparePassword } from 'src/utils/bcrypt';

@Injectable()
export class AuthService {

    constructor(@Inject("USER_SERVICE") private readonly userService : UsersService){

    }

    async validateUser(username:string, password:string){
        const userDB = await this.userService.findUserByUsername(username)

        const matched = comparePassword(password,userDB.password)
        console.log("UserDB: " , userDB)
        if(!userDB){
            return null
        }
        if(matched){
            console.log("User validation success")
            return plainToClass(SerializedUser,userDB)
        }else{
            console.log("password do not match")
        }
    }
}
