import { Module } from '@nestjs/common';
import { ControllersController } from './controllers/controllers.controller';
import { ServicesService } from './services/admin.service';
@Module({
  controllers: [ControllersController],
  providers: [{
    provide:"ADMIN_SERVICES",
    useClass: ServicesService
  }],
})
export class AdminModule {}
