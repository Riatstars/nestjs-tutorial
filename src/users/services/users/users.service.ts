import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { User as UserEntity} from 'src/typeorm/User';
import { CreateUserDto } from 'src/users/dto/CreateUser.dto';
import { SerializedUser, User } from 'src/users/types/User';
import { encodePassword } from 'src/utils/bcrypt';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>){

    }
    private users: User[] = [
        {
            id: 1,
            username: "nampham",
            password: "nampham"
        },
        {
            id: 2,
            username: "nampham1",
            password: "nampham1"
        },
        {
            id: 3,
            username: "nampham2",
            password: "nampham2"
        },
        {
            id: 4,
            username: "nampham3",
            password: "nampham3"
        },
        {
            id: 5,
            username: "nampham4",
            password: "nampham4"
        },
        {
            id: 6,
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

    getUserById (id: number) {
        const user = this.users.find(user=> user.id === id)
        if(!user){
            throw new HttpException("User not found", HttpStatus.BAD_REQUEST)
        }
        return new SerializedUser(user)
    }

     createUser  (createUserDetail: CreateUserDto){
        const password = encodePassword(createUserDetail.password)
        console.log(password)
        const newUser = this.userRepository.create({...createUserDetail, password})
       return this.userRepository.save(newUser)
    }

    findUserByUsername(username:string){
        return this.userRepository.findOneBy({username});
    }

}
