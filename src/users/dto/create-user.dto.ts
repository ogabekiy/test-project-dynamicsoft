import { IsEmail, IsIn, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";
import { UserRole } from "../entities/user.entity";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    @Length(5)
    password: string

    @IsOptional()
    role: UserRole

}
