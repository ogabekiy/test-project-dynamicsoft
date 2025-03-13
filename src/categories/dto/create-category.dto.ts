import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCategoryDto {
    @ApiProperty({ example: "Elektronikalar" })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiPropertyOptional({ example: "zur mahsulotlar" })
    @IsString()
    @IsOptional()
    description: string;

    @ApiPropertyOptional({ type: "string", format: "binary", description: "bu file junatilsa uni papkaga saqlab manzil saqlanadi" })
    @IsOptional()
    image?: string
}
