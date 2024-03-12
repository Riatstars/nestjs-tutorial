import { Body, Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Req, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateCustomerDto } from 'src/customers/dtos/CreateCustomer.dto';
import { CustomersService } from 'src/customers/services/customers/customers.service';

@Controller('customers')
export class CustomersController {
    constructor (private customersService: CustomersService){}

    @Get('')
    getAllCustomers(){
        return this.customersService.getAllCustomers()
    }

    @Get(":id")
    getCustomer(
        @Req() req: Request,
        @Res() res: Response){
            const id = parseInt(req.params.id)
       const customer = this.customersService.findCustomerById(id)
       if(!customer){
        res.status(400).send({msg: "Customer not found"})
       }
       res.send(customer) 
    }

    @Get("/search/:id")
    searchCustomerById(@Param('id',ParseIntPipe) id: number){
        const customer = this.customersService.findCustomerById(id)
        if(!customer){
         throw new HttpException("Customer not found", HttpStatus.BAD_REQUEST)
        }
        return customer
     }

     @Post("create")
     @UsePipes(ValidationPipe)
     createCustomer(@Body() createCustomerDto: CreateCustomerDto){
        return this.customersService.createCustomer(createCustomerDto)
     }
}
