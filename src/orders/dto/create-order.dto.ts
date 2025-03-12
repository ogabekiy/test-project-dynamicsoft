import { IsNotEmpty, IsNumber, IsOptional } from "class-validator"
import { statusType } from "../entities/order.entity"

export class CreateOrderDto {
    @IsNumber()
    @IsOptional()
    user_id: number

    @IsNumber()
    @IsNotEmpty()
    product_id: number

    @IsNumber()
    @IsNotEmpty()
    quantity: number

    @IsOptional()
    status: statusType
}
