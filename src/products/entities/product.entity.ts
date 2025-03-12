import { Basket } from "src/baskets/entities/basket.entity";
import { Category } from "src/categories/entities/category.entity";
import { Order } from "src/orders/entities/order.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "products" })
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    description: string;

    @Column({ nullable: false })
    price: number;

    @Column({ nullable: false })
    stock: number;

    @Column({ nullable: false })
    image: string;

    @ManyToOne(() => Category, (category) => category.products, { nullable: false, onDelete: "CASCADE" })
    category: Category;

    @OneToMany(() => Basket, (basket) => basket.product) 
    baskets: Basket[];

    @OneToMany(() => Order, (order) => order.product) 
    orders: Order[];
}
