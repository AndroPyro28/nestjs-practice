import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ServicesService } from './services/customer.service';
import { ControllersController } from './controllers/controllers.controller';
import { ValidateCustomerMiddlewares } from './middlewares/validateCustomer';
import { SomeMiddleWare } from './middlewares/someMiddleware';

@Module({
  controllers: [ControllersController],
  providers: [ServicesService],
})
export class CustomersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // to give some routes a middleware simply include the path and method of a middleware you chose
    consumer.apply(ValidateCustomerMiddlewares, SomeMiddleWare) 
    .forRoutes(
      {
        path:'customers/:id',
        method: RequestMethod.GET
      },
      {
        path:'customers/',
        method: RequestMethod.POST
      },
    )

    // to give all routes a middleware simply include the entire middleware
    // configure(consumer: MiddlewareConsumer) {
    //   consumer.apply(ValidateCustomerMiddlewares, SomeMiddleWare)
    //   .forRoutes(ControllersController)
  }
}
