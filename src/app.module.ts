import { Module } from '@nestjs/common';
import { CustomersModule } from './routes/customers/customers.module';
import { AdminModule } from './routes/admin/admin.module';

@Module({
  imports: [CustomersModule, AdminModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
