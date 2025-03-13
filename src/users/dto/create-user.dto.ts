import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsIn, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";
import { UserRole } from "../entities/user.entity";

export class CreateUserDto {
    @ApiProperty({ example: "John Doe" })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: "bek@gmail.com" })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ example: "ogabek", description: "eng kamida 5ta belgi" })
    @IsString()
    @IsNotEmpty()
    @Length(5)
    password: string;

    @ApiPropertyOptional({ example: "user", description: "user yoki admin" })
    @IsIn(['user','admin'])
    @IsOptional()
    role: UserRole;
}
