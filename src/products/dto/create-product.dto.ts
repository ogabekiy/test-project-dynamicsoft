import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Transform } from "class-transformer";

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @Transform(({ value }) => Number(value))
    @IsNumber()
    @IsNotEmpty()
    price: number;

    @Transform(({ value }) => Number(value))
    @IsNumber()
    @IsNotEmpty()
    stock: number;

    @IsOptional()
    image?: string;

    @Transform(({ value }) => Number(value))
    @IsNumber()
    categoryId: number
}