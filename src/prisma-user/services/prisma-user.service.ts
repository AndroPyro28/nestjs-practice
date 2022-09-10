import { Injectable, HttpStatus } from '@nestjs/common';
import { CarDto, CreateUserDto, isEmailDto } from '../Dto';
import { car as Car, user as User } from 'models/index.models';

@Injectable()

export class ServicesService {
  async createPrismaUser(data: CreateUserDto) {
    try {
      const prismaUser = await User.create({
        data,
      });

      return prismaUser;
    } catch (error) {
      console.log(error);
    }
  }

  async createCar(data: CarDto):Promise<CarDto> {
    try {
      const prismaUser = await Car.create({ data });
      return prismaUser;
    } catch (error) {
      console.log(error);
    }
  }

  async GetAllUsers() {
    try {
      const prismaUsers = await User.findMany({
        include: {
          cars: true,
        },
      });
      return prismaUsers;
    } catch (error) {
      console.log(error);
    }
  }

  async getUserById(id: number) {
    try {
      const prismaUser = await User.findUnique({
        where: {
          id,
        },
        include: {
          cars: true,
        },
      });

      return prismaUser;
    } catch (error) {
      console.log(error);
    }
  }

  async getUserByCarId(id: number) {
    try {
      const prismaUsers = await User.findMany({
        include: {
          cars: true,
        },
      });

      const userSelectedByCarId = prismaUsers.filter((user) =>
        user.cars.some((car) => car.id == id),
      );

      return userSelectedByCarId;
    } catch (error) {
      console.log(error);
    }
  }

  async updatePrismaUser(prismaData: { id: number; body: isEmailDto }) {
    try {
      const updatePrimaUser = await User.update({
        where: {
          id: prismaData.id,
        },
        data: prismaData.body,
      });
      return updatePrimaUser;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteUserById(id: number) {
    try {
      const deletePrismaUser = await User.delete({
        where: {
          id,
        },
      });
      return deletePrismaUser;
    } catch (error) {
      console.log(error);
    }
  }
}
