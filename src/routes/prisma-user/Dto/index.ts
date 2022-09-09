import { IsEmail, IsNotEmpty, IsNumber, MinLength } from "class-validator"

export class CreateUserDto {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(3, {
        message: "Name must be minimum length of 3"
    })
    name: string;

    @IsNotEmpty()
    password: string
}

export class CarDto {
    @IsNotEmpty()
    brand_name: string;

    @IsNotEmpty()
    color: string;

    @IsNotEmpty()
    @IsNumber()
    user_id: number;
}

export class isEmailDto {
    @IsEmail()
    email: string;
}