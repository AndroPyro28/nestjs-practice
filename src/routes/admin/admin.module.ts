import { Module } from '@nestjs/common';
import { ControllersController } from './controllers/controllers.controller';
import { ServicesService } from './services/admin.service';

@Module({
  controllers: [ControllersController],
  providers: [ServicesService],
})
export class AdminModule {}
