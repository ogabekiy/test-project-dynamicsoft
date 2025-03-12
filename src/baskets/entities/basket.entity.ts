import { Product } from "src/products/entities/product.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'baskets'})
export class Basket {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.baskets, { nullable: false })
    user: User;

    @ManyToOne(() => Product, (product) => product.baskets, { nullable: false })
    product: Product;

    @Column()
    quantity: number
}

