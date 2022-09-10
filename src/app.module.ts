import { Module } from '@nestjs/common';
import { CustomersModule } from './routes/customers/customers.module';
import { AdminModule } from './routes/admin/admin.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaUserModule } from './routes/prisma-user/prisma-user.module';
import { AuthModule } from './routes/auth/auth.module';
@Module({
  imports: [
    CustomersModule,
    AdminModule,
    ConfigModule.forRoot(),
    PrismaUserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
