import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
