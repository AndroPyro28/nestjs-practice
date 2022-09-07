import { Controller, Get, HttpException, HttpStatus, Post, Req, Res, Body } from '@nestjs/common';
import { Request, Response } from 'express';
import { CustomerClass } from '../classes/CustomerClass';
import { ServicesService } from '../services/customer.service';
import { validateOrReject } from 'class-validator'
@Controller('customers')
export class ControllersController {
  constructor(private readonly appServices: ServicesService) { }

  @Get('')
  getCustomers(@Req() req: Request, @Res() res: Response) {
    const customers = this.appServices.findCustomer();
    res.status(200).json(customers);
  }

  @Get(':id')
  findUserById(@Req() req: Request, @Res() res: Response) {
    try {
      const customer = this.appServices.findCustomerById(Number(req.params.id));
      if (!customer) {
        throw new HttpException('customer not found!', HttpStatus.BAD_REQUEST)
      }

      return res.status(200).json(customer);

    } catch (error) {
      return res.status(error.status).json(error);
    }
  }

  @Post('')
  async createUser(@Body() BodyCustomer: CustomerClass, @Res() res: Response) { //body parser @Body()
    try {
      const newCustomer = new CustomerClass(BodyCustomer);
      validateOrReject(newCustomer)
        .then((yes) => {
          const result = this.appServices.createCustomer(BodyCustomer);
          
          if (!result.success) {
            throw new HttpException('Email already exist!', HttpStatus.BAD_REQUEST);
          }

          return res.status(200).json(result);
        })
        
        .catch(result => {
          return res.status(400).json({
            msg:Object.values(result[0].constraints)[0],
            success:false
          })
        })
    } catch (error) {
      return res.status(error.status).json(error)
    }
  }


}
