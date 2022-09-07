import { Module } from '@nestjs/common';
import { ServicesService } from './services/customer.service';
import { ControllersController } from './controllers/controllers.controller';

@Module({
  controllers: [ControllersController],
  providers: [ServicesService],
})
export class CustomersModule {}
