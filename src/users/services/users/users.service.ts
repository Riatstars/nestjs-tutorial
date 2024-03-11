import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { SerializedUser, User } from 'src/users/types/User';

@Injectable()
export class UsersService {
    private users: User[] = [
        {
            username: "nampham",
            password: "nampham"
        },
        {
            username: "nampham1",
            password: "nampham1"
        },
        {
            username: "nampham2",
            password: "nampham2"
        },
        {
            username: "nampham3",
            password: "nampham3"
        },
        {
            username: "nampham4",
            password: "nampham4"
        },
        {
            username: "nampham5",
            password: "nampham5"
        }
    ]

    getUsers(){
        return this.users.map(user => plainToClass(SerializedUser,user))
    }

    getUserByUsername(username:string){
        const user = this.users.find(user=> user.username === username)
        if(!user){
            throw new HttpException("User not found", HttpStatus.BAD_REQUEST)
        }
        return new SerializedUser(user)
    }

}
