import {
  Controller,
  ParseIntPipe,
  Get,
  Req,
  Res,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UserNotFoundException } from '../exceptions/UserNotFound';
import { ServicesService } from '../services/admin.service';
import { Admin, SerializedAdmin } from '../types/Admin';

@Controller('admin')
export class ControllersController {
  constructor(private readonly adminServices: ServicesService) {}

  @Get('')
  getAdmin(@Req() req: Request, @Res() res: Response) {
    try {
      const adminList = this.adminServices.getAdminsButSerialized() as Admin[];

      if (!adminList) {
        throw new HttpException(
          'No admin found!',
          HttpStatus.EXPECTATION_FAILED,
        );
      }

      return res.status(HttpStatus.OK).json({
        data: adminList,
        success: true,
      });
    } catch (error) {
      return res.status(error.status).json(error);
    }
  }

  @Get(':id')
  getAdminById(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    try {
      const admin = this.adminServices.getAdminById(id);

      if (!admin) throw new UserNotFoundException();

      return res.status(HttpStatus.OK).json(admin);
    } catch (error) {
      return res.status(error.status).json(error);
    }
  }
}
