import { Controller, Get, HttpException, HttpStatus, Post, Req, Res, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { Request, Response } from 'express';
import { CustomerClass } from '../classes/CustomerClass';
import { ServicesService } from '../services/customer.service';
import { validate, validateOrReject,  } from 'class-validator'

@Controller('customers')
export class AdminsController {
  constructor(private readonly appServices: ServicesService) { }
  
  @Get('')
  getCustomers(@Req() req: Request, @Res() res: Response) {
    const customers = this.appServices.findCustomer();
    res.status(HttpStatus.OK).json(customers);
  }

  @Get(':id')
  findUserById(@Req() req: Request, @Res() res: Response) {
    try {
      const customer = this.appServices.findCustomerById(Number(req.params.id));
      if (!customer) {
        throw new HttpException('customer not found!', HttpStatus.BAD_REQUEST)
      }

      return res.status(HttpStatus.OK).json(customer);

    } catch (error) {
      return res.status(error.status).json(error);
    }
  }

  @Post('')
  @UsePipes(ValidationPipe)
  async createUser(@Body() BodyCustomer: CustomerClass, @Res() res: Response) { //body parser @Body()
    try {

      // alternative for express
      // const newCustomer = new CustomerClass(BodyCustomer);

      // const result = await validate(newCustomer) //validating body

      // if (result.length > 0) { // will execute when there is an error
      //   console.log(result)
      //   const errMessage = Object.values(result[0].constraints)[0]
      //   throw new HttpException(errMessage, HttpStatus.BAD_REQUEST)
      // }

       const queryResult = this.appServices.createCustomer(BodyCustomer);
      if (!queryResult.success) {
        throw new HttpException('Email already exist!', HttpStatus.BAD_REQUEST);
      }
      return res.status(HttpStatus.CREATED).json(queryResult);

    } catch (error) {
      return res.status(error.status).json(error)
    }
  }
}
