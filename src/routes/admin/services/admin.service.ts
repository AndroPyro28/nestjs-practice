import { Injectable } from '@nestjs/common';
import { Admin, SerializedAdmin } from '../types/Admin';
import { plainToInstance } from "class-transformer"
@Injectable()
export class ServicesService {
  private admins: Admin[] = [
    {
      "username":"andro",
      "password":"1234"
    },
    {
      "username":"jean",
      "password":"1234"
    },
    {
      "username":"anson",
      "password":"1234"
    },
    {
      "username":"jhondel",
      "password":"1234"
    },
  ]

  getAdmins = () => {
    return this.admins as Admin[];
  }
  getAdminsButSerialized = () => {
    return this.admins.map(admin => plainToInstance(SerializedAdmin, admin))
  }

  getAdminByUsername = (username: string) => {
    return plainToInstance(SerializedAdmin, this.admins.find(admin => admin.username == username ))
  }
}
