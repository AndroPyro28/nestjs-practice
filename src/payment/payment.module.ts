import { Module } from '@nestjs/common';
import { PaymentController } from './controllers/payment.controller';
import { ServicesService } from './services/services.service';

@Module({
  controllers: [PaymentController],
  providers: [ServicesService]
})
export class PaymentModule {}
