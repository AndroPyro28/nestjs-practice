import { Module } from '@nestjs/common';
import { ControllerController as PrismaUserController } from './controllers/prisma-user.controller';
import { ServicesService as PrismaUserService } from './services/prisma-user.service';

@Module({
  controllers: [PrismaUserController],
  providers: [PrismaUserService],
})
export class PrismaUserModule {}
