import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class ValidateCustomerMiddleware implements NestMiddleware{
    use(req: Request, res: Response, next: NextFunction){
        console.log("Hello wordl< this called inside middleware")
        const {authorization} = req.headers
        if(!authorization){
            return res.status(403).send({error: "No authentication token provided"})
        }
        if(authorization!=="123"){
            return res.status(403).send({error: "Invalid Authentication key provided"})
        }
        next()
    }

}