import { Module } from '@nestjs/common';
import { CustomersModule } from './customers/customers.module';
import { AdminModule } from './admin/admin.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaUserModule } from './prisma-user/prisma-user.module';
import { AuthModule } from './auth/auth.module';
import { PaymentModule } from './payment/payment.module';
import { GatewayModule } from './websocket/gateway.module';

@Module({
  imports: [
    CustomersModule,
    AdminModule,
    ConfigModule.forRoot(),
    PrismaUserModule,
    AuthModule,
    PaymentModule,
    GatewayModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
