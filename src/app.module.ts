import { Module } from '@nestjs/common';
import { CustomersModule } from './customers/customers.module';
import { AdminModule } from './admin/admin.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaUserModule } from './prisma-user/prisma-user.module';
import { AuthModule } from './auth/auth.module';
import { PaymentModule } from './payment/payment.module';
import { GatewayModule } from './websocket/gateway.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    CustomersModule,
    AdminModule,
    ConfigModule.forRoot(),
    PrismaUserModule,
    AuthModule,
    PaymentModule,
    GatewayModule,
    // ThrottlerModule.forRoot({ rate limitting api
    //   ttl: 10,
    //   limit: 2
    // })
  ],
  controllers: [],
  providers: [
  //   {
  //   provide: APP_GUARD,
  //   useClass: ThrottlerGuard
  // }
],
})
export class AppModule {}
