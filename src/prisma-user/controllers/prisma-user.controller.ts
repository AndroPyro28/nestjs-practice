import {
  Body,
  Controller,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
  HttpStatus,
  HttpException,
  Get,
  Put,
  ParseIntPipe,
  Param,
  Delete,
} from '@nestjs/common';
import { ServicesService as PrismaUserService } from '../services/prisma-user.service';
import { Response } from 'express';
import { CreateUserDto, isEmailDto, CarDto } from '../Dto';
import { sign, verify } from 'jsonwebtoken';

@Controller('prisma')
export class ControllerController {
  constructor(private readonly PrismaUserService: PrismaUserService) {}

  @Post('/user')
  @UsePipes(ValidationPipe)
  async createUser(@Body() body: CreateUserDto, @Res() res: Response) {
    const createResult = await this.PrismaUserService.createPrismaUser(body);

    if (!createResult) {
      throw new HttpException('email is already exist', HttpStatus.BAD_REQUEST);
    }

    return res.status(HttpStatus.CREATED).json(createResult);
  }

  @Post('/car')
  @UsePipes(ValidationPipe)
  async createCar(
    @Body() body: { token: string; data: CarDto },
    @Res() res: Response,
  ) {
    const createResult = await this.PrismaUserService.createCar(body.data);
    if (!createResult) {
      throw new HttpException('car did not create', HttpStatus.BAD_REQUEST);
    }

    const payload = verify(body.token, 'secret', {
      maxAge: 24 * 60 * 60, // 1 day
    });

    return res.status(HttpStatus.CREATED).json({ createResult, payload });
  }

  @Get('/user')
  async getAllUsers(@Res() res: Response) {
    const getAllPrismaUsers = await this.PrismaUserService.GetAllUsers();
    if (!getAllPrismaUsers) {
      throw new HttpException('Theres no user!', HttpStatus.BAD_REQUEST);
    }
    const token = sign({ id: 1, name: 'andro' }, 'secret');

    return res.status(HttpStatus.OK).json({ token, getAllPrismaUsers });
  }

  @Get('/user/:id')
  async getUserById(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ) {
    const user = await this.PrismaUserService.getUserById(id);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
    return res.status(HttpStatus.OK).json(user);
  }

  @Get('/car/:id')
  async getUserByCarId(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ) {
    const user = await this.PrismaUserService.getUserByCarId(id);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
    return res.status(HttpStatus.OK).json(user);
  }

  @Put('/user/:id')
  @UsePipes(ValidationPipe)
  async updateUserEmailById(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: isEmailDto,
    @Res() res: Response,
  ) {
    const prismaUserUpdatedResult =
      await this.PrismaUserService.updatePrismaUser({ id, body });

    if (!prismaUserUpdatedResult) {
      throw new HttpException('User did not update', HttpStatus.BAD_REQUEST);
    }
    return res.status(HttpStatus.OK).json(prismaUserUpdatedResult);
  }

  @Delete('/user/:id')
  async deleteUserById(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ) {
    const prismaUserDeleteResult = await this.PrismaUserService.deleteUserById(
      id,
    );

    if (!prismaUserDeleteResult) {
      throw new HttpException('User did not deleted', HttpStatus.BAD_REQUEST);
    }

    return res.status(HttpStatus.OK).json(prismaUserDeleteResult);
  }
}
