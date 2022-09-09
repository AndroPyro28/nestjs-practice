import { Injectable } from '@nestjs/common';
import { Admin, SerializedAdmin } from '../types/Admin';
import { plainToInstance } from "class-transformer"

@Injectable()
export class ServicesService {

  private admins: Admin[] = [
    {
      "id": 1,
      "username":"andro",
      "password":"1234"
    },
    {
      "id": 2,
      "username":"jean",
      "password":"1234"
    },
    {
      "id": 3,
      "username":"anson",
      "password":"1234"
    },
    {
      "id": 4,
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
    const admin = this.admins.find(admin => admin.username == username )
    return plainToInstance(SerializedAdmin, admin);
  }

  getAdminById = (id: number) => {
    const admin = this.admins.find(admin => admin.id == id )
    return plainToInstance(SerializedAdmin, admin)
  }
}
