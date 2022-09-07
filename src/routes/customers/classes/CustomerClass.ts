import { IsNotEmpty, IsEmail, IsNumber, MinLength } from "class-validator"

export class CustomerClass {

    constructor({id, email, password}) {
        this.id = id
        this.email = email
        this.password = password
    }

    @IsNumber()
    id: number;

    @IsEmail()
    email:string;

    @IsNotEmpty()
    @MinLength(4)
    password: string;

    
}