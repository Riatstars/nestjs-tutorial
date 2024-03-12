import {Strategy} from "passport-local"

import {PassportStrategy} from "@nestjs/passport"
import { Inject, Injectable, UnauthorizedException } from "@nestjs/common"
import { AuthService } from "../services/auth/auth.service"

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
constructor(@Inject("AUTH_SERVICE") private readonly authService: AuthService){
    super()
}
async validate(username:string, password: string){
    console.log(username, " Within strategy")
    const user  = this.authService.validateUser(username, password)
    if(!user){
        throw new UnauthorizedException()
    }
    return user
}
}