import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin'
}

@Entity({name: 'users'})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false})
  name: string;

  @Column({ unique: true ,nullable: false })
  email: string;

  @Column({nullable: false})
  password: string

  @Column({type: 'enum',enum: UserRole,default: UserRole.USER})
  role: UserRole
}
