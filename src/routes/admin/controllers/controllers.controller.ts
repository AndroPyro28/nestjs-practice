import { Controller, Get } from '@nestjs/common';
import { ServicesService } from '../services/admin.service';

@Controller('admin')
export class ControllersController {
  constructor(private readonly adminServices: ServicesService) {}
  @Get('')
  getAdmin() {
    return this.adminServices.findAdmin();
  }
}
