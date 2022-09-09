import { Module, } from '@nestjs/common';
import { CustomersModule } from './routes/customers/customers.module';
import { AdminModule } from './routes/admin/admin.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [CustomersModule, AdminModule, ConfigModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule {
}
