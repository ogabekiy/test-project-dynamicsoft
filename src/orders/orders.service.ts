import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class OrdersService {
  constructor(@InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(Product) private productRepo: Repository<Product>  ,
    @InjectRepository(User) private userRepo: Repository<User>){}

  async create(createOrderDto: CreateOrderDto) {

    const product = await this.productRepo.findOne({where:{id:createOrderDto.product_id}})
    const user = await this.userRepo.findOne({where:{id:createOrderDto.user_id} })

    const order = this.orderRepo.create({...createOrderDto,product,user})

    return await this.orderRepo.save(order)
  }

  async findAll() {
    return await this.orderRepo.find({relations: ['product','user']})
  }

  async findAllOfUser(userId: number) {
    return await this.orderRepo.find({ where: { user: { id: userId } } ,relations: ['user']});
}


  async findOne(id: number) {
    return await this.orderRepo.findOne({where:{id},relations:['user','product']})
  }


}
