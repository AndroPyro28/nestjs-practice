import { Injectable } from '@nestjs/common';

@Injectable()
export class ServicesService {
  findAdmin() {
    return {
      id: 1,
      email: 'adminemail@gmail.com',
      createdAt: new Date(),
    };
  }
}
