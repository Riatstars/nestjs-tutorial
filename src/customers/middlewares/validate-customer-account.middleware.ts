import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";


export function ValidateCustomerAccountMiddleware
(req: Request, res: Response, next: NextFunction){
    const {valid} = req.headers;
    console.log("validating account")
    if(!valid){
        return res.status(403).send({error: "Account is invalid"})
    }
    next()
}
