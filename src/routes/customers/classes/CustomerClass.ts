import { Type } from "class-transformer";
import { IsNotEmpty, IsEmail, IsNumber, MinLength, IsNumberString, ValidateNested, IsNotEmptyObject } from "class-validator";

class CustomerAddress {

    @IsNotEmpty()
    address1:string;
    address2:string;

    @IsNumberString()
    @IsNotEmpty()
    zip:string;

    @IsNotEmpty()
    city:string;

    @IsNotEmpty()
    state:string;
}

export class CustomerClass {
    
      // alternative for express

    // constructor({id=undefined, email="", password="", address={} as CustomerAddress}) {
    //     this.id = id
    //     this.email = email
    //     this.password = password
    //     this.address = address;
    // }

    @IsNumber()
    id: number | undefined;

    @IsEmail()
    email:string;

    @IsNotEmpty()
    @MinLength(4)
    password: string;

    @ValidateNested()
    @IsNotEmptyObject()
    @Type(() => CustomerAddress)
    address: CustomerAddress

    
}