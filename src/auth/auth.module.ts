import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { SomeMiddleWare } from 'src/customers/middlewares/someMiddleware';
import { ControllersController } from './controllers/controllers.controller';
import { AuthServices } from './services/auth.service';

@Module({
  controllers: [ControllersController],
  providers: [{
    provide: 'AUTH_SERVICES',
    useClass: AuthServices
  }]
})
export class AuthModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SomeMiddleWare).exclude().forRoutes(ControllersController)
  }
}
