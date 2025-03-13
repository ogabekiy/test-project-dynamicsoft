import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Transform } from "class-transformer";

export class CreateProductDto {
    @ApiProperty({ example: "telefon" })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: "zur telefon" })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({ example: 1500, description: "narx faqat raqamlar" })
    @Transform(({ value }) => Number(value))
    @IsNumber()
    @IsNotEmpty()
    price: number;

    @ApiProperty({ example: 10, description: "mahsulot nechtaligi" })
    @Transform(({ value }) => Number(value))
    @IsNumber()
    @IsNotEmpty()
    stock: number;

    @ApiPropertyOptional({ example: "file", description: "Postman dan rasm jonatilda faylga saqlab manzil saqlanadi" })
    @IsOptional()
    image?: string;

    @ApiProperty({ example: 1 })
    @Transform(({ value }) => Number(value))
    @IsNumber()
    categoryId: number;
}
