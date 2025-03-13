import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginAuthDto {
    @ApiProperty({ example: "ogabek@gamil.com" })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ example: "ogabek" })
    @IsString()
    @IsNotEmpty()
    password: string;
}
