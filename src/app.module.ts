import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { BasketsModule } from './baskets/baskets.module';
import { OrdersModule } from './orders/orders.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './common/shared.module';
import { Category } from './categories/entities/category.entity';
import { Product } from './products/entities/product.entity';
import { Basket } from './baskets/entities/basket.entity';
import { Order } from './orders/entities/order.entity';

@Module({
  imports: [
      TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: process.env.DB_PASSWORD,
        database: 'test_ecommerce_db',
        entities: [User,Category,Product,Basket,Order],
        synchronize: true
      }),
  UsersModule, CategoriesModule, ProductsModule, BasketsModule, OrdersModule, AuthModule,SharedModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
