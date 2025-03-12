import { Product } from "src/products/entities/product.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export enum statusType {
    PENDING = 'pending',
    DELIVERED = 'delivered'
}

@Entity({name: 'orders'})
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.orders, { nullable: false })
    user: User;

    @ManyToOne(() => Product, (product) => product.orders, { nullable: false })
    product: Product;

    @Column({nullable: false})
    quantity: number

    @Column({type :'enum',enum: statusType, default: statusType.PENDING})
    status: statusType
}
