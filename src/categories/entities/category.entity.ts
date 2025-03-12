import { Product } from "src/products/entities/product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'categories'})
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    name: string;

    @Column({nullable: true})
    description: string;

    @Column('text',{ default: '' })
    image: string;

    @OneToMany(() => Product, (product) => product.category)
    products: Product[];
}
