import { Injectable, HttpStatus } from '@nestjs/common';
import { PrismaClient } from "@prisma/client";
import { CarDto, CreateUserDto, isEmailDto } from '../Dto';

@Injectable()
export class ServicesService {
    private prismaClient = new PrismaClient();

    async createPrismaUser(data: CreateUserDto) {
        try {
            const prismaUser = await this.prismaClient.user.create({ data, include: {
                cars: true
            } });
            return { ...prismaUser, httpStatus: HttpStatus.CREATED };
        } catch (error) {
            return { ...error, errMsg: 'Email already exist!', httpStatus: HttpStatus.BAD_REQUEST }
        }
    }

    async createCar (data: CarDto) {
        try {
            const prismaUser = await this.prismaClient.car.create({data})
            return prismaUser;
        } catch (error) {
            console.log(error)
        }
    }

    async GetAllUsers() {
        try {
            const prismaUsers = await this.prismaClient.user.findMany({
                include: {
                    cars: true
                }
            });
            return prismaUsers
        } catch (error) {
            console.log(error)
        }
    }

    async getUserById(id: number) {
        try {
            const prismaUser = await this.prismaClient.user.findUnique(
                {
                    where: {
                        id
                    },
                    include: {
                        cars: true
                    },
                }
            );

            return prismaUser;
        } catch (error) {
            console.log(error)
        }
    }

    async getUserByCarId(id: number) {
        try {
            const prismaUsers = await this.prismaClient.user.findMany({
                include: {
                    cars: true
                }
            });

            const userSelectedByCarId = prismaUsers.filter(user => user.cars.some(car => car.id == id));

            return userSelectedByCarId;
        } catch (error) {
            console.log(error)
        }
    }

    async updatePrismaUser(prismaData: { id: number, body: isEmailDto }) {
        try {
            const updatePrimaUser = await this.prismaClient.user.update({
                where: {
                    id: prismaData.id,
                },
                data: prismaData.body
            });
            return updatePrimaUser
        } catch (error) {
            console.log(error)
        }
    }

    async deleteUserById(id: number) {
        try {
            const deletePrismaUser = await this.prismaClient.user.delete({
                where: {
                    id
                }
            });
            return deletePrismaUser;

        } catch (error) {
            console.log(error)
        }
    }
}
