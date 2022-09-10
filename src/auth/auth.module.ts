import { Module } from '@nestjs/common';
import { ControllersController } from './controllers/controllers.controller';
import { AuthServices } from './services/auth.service';

@Module({
  controllers: [ControllersController],
  providers: [{
    provide: 'AUTH_SERVICES',
    useClass: AuthServices
  }]
})
export class AuthModule {}
