import {
  MiddlewareConsumer,
  Module,
  NestModule,
  Next,
  Req,
  RequestMethod,
  Res,
} from '@nestjs/common';
import { ServicesService } from './services/customer.service';
import { AdminsController } from './controllers/admins.controller';
import { ValidateCustomerMiddlewares } from './middlewares/validateCustomer';
import { SomeMiddleWare } from './middlewares/someMiddleware';
import { Request, Response, NextFunction } from 'express';

@Module({
  controllers: [AdminsController],
  providers: [ServicesService],
})
export class CustomersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    /* to give some routes a middleware simply include the path and method of a middleware you chose */

    // consumer.apply(ValidateCustomerMiddlewares, SomeMiddleWare)
    // .forRoutes(
    //   {
    //     path:'customers/:id',
    //     method: RequestMethod.GET
    //   },
    //   {
    //     path:'customers/',
    //     method: RequestMethod.POST
    //   },
    // )

    /* to give all routes a middleware simply include the entire middleware */

    consumer
      .apply(
        ValidateCustomerMiddlewares,
        SomeMiddleWare,
        (req: Request, res: Response, next: NextFunction) => {
          // last middleware
          console.log('last middleware triggered');
          next();
        },
      )
      .exclude(
        {
          // exclude method is making some of your routes excluded to a middleware
          path: `/api/customers`, // prefix /api needs to be included
          method: RequestMethod.GET,
        },
        {
          // exclude method is making some of your routes excluded to a middleware
          path: `/api/customers/:id`, // prefix /api needs to be included
          method: RequestMethod.GET,
        },
      )
      .forRoutes(AdminsController);
  }
}
