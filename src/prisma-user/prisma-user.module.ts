import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ControllerController as PrismaUserController } from './controllers/prisma-user.controller';
import { ServicesService as PrismaUserService } from './services/prisma-user.service';

@Module({
  imports: [ThrottlerModule.forRoot({ // rate limitting api
    ttl: 10,
    limit:3
  })],
  controllers: [PrismaUserController],
  providers: [PrismaUserService, 
  {
    provide: APP_GUARD, // rate limitting api
    useClass: ThrottlerGuard
  }],
})
export class PrismaUserModule {}
