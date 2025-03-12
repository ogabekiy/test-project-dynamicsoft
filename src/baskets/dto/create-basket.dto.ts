import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateBasketDto {
    @IsNumber()
    @IsNotEmpty()
    user_id: number

    @IsNumber()
    @IsNotEmpty()
    product_id: number

    @IsNumber()
    @IsNotEmpty()
    quantity: number
}
