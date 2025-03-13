import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { statusType } from "../entities/order.entity";

export class CreateOrderDto {
    @ApiPropertyOptional({ example: 1, description: "auth orqali olinadi id" })
    @IsNumber()
    @IsOptional()
    user_id: number;

    @ApiProperty({ example: 10, description: "mahsulot id si kiritiladi" })
    @IsNumber()
    @IsNotEmpty()
    product_id: number;

    @ApiProperty({ example: 5, description: "nechta buyurtma qilmoqchiligi" })
    @IsNumber()
    @IsNotEmpty()
    quantity: number;

    @ApiPropertyOptional({ example: "pending", description: "jonatilmasa ham o'zi pending saqlanadi" })
    @IsOptional()
    status: statusType;
}
