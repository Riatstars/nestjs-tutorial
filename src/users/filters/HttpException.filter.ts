import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Request, Response, response } from "express";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter{
    catch(exception: HttpException, host: ArgumentsHost){
        console.log(exception)
        console.log(host)


        const context = host.switchToHttp()
        const request = context.getRequest<Request>()
        const response = context.getResponse<Response>()

        response.sendStatus(exception.getStatus())
    }
}
