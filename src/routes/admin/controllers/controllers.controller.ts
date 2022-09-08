import { Controller, Get, Req, Res, HttpException, HttpStatus, Inject, Param, Body } from '@nestjs/common';
import { Request, Response } from 'express';
import { ServicesService } from '../services/admin.service';
import { Admin } from '../types/Admin';

@Controller('admin')
export class ControllersController {

  constructor(@Inject("ADMIN_SERVICES") private readonly adminServices: ServicesService) {}

  @Get('')
  getAdmin(@Req() req: Request, @Res() res: Response) {
    try {
      const adminList = this.adminServices.getAdminsButSerialized() as Admin[];

    if(!adminList) {
      throw new HttpException('No admin found!', HttpStatus.EXPECTATION_FAILED);
    }

    return res.status(200).json({
      data: adminList,
      success: true
    })
    } catch (error) {
      return res.status(error.status).json(error);
    }
  }

  @Get(':username')
  getAdminByUsername (@Param('username') username: string) {
    try {
      const admin = this.adminServices.getAdminByUsername(username);

      if(!admin) {
        throw new HttpException('Admin not found!', HttpStatus.EXPECTATION_FAILED);
      }

    } catch (error) {
      return
    }
  }
}
