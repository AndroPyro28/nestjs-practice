import { Injectable } from '@nestjs/common';
import { CustomerClass } from '../classes/CustomerClass';

@Injectable()
export class ServicesService {
 private users:CustomerClass[]  = [
    {
      id: 1,
      email: 'email1@gmail.com',
      password: '123123123',
    },
    {
      id: 2,
      email: 'email2@gmail.com',
      password: '123123123',
    },
    {
      id: 3,
      email: 'email3@gmail.com',
      password: '123123123',
    },
  ];

  findCustomer() {
    return this.users;
  }

  findCustomerById(id: number) {
    return this.users
    .find((user) => user.id == id);
  }

  createCustomer(customer: CustomerClass) {
    const emailAlreadyExist = this.users.some(user => user.email == customer.email);

    if (emailAlreadyExist) {
      return {
        success: false,
      }
    }

    this.users.push(customer);
    return {
      data: this.users,
      success: true
    };
  }
}
