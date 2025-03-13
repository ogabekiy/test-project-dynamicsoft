import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreateBasketDto {
    @ApiPropertyOptional({ example: 1, description: "auth orqali olinadi" })
    @IsNumber()
    @IsOptional()
    user_id: number;

    @ApiProperty({ example: 10})
    @IsNumber()
    @IsNotEmpty()
    product_id: number;

    @ApiProperty({ example: 2, description: "miqdori" })
    @IsNumber()
    @IsNotEmpty()
    quantity: number;
}
