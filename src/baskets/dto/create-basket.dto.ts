import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateBasketDto {
    @IsNumber()
    @IsOptional()
    user_id: number

    @IsNumber()
    @IsNotEmpty()
    product_id: number

    @IsNumber()
    @IsNotEmpty()
    quantity: number
}
