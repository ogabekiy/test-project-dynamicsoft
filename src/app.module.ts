import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { BasketsModule } from './baskets/baskets.module';
import { OrdersModule } from './orders/orders.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
      TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: '123456',
        database: 'test_ecommerce_db',
        entities: [User],
        synchronize: true
      }),
  UsersModule, CategoriesModule, ProductsModule, BasketsModule, OrdersModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
