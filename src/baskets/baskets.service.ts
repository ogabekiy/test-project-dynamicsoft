import { Injectable } from '@nestjs/common';
import { CreateBasketDto } from './dto/create-basket.dto';
import { UpdateBasketDto } from './dto/update-basket.dto';
import { Basket } from './entities/basket.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class BasketsService {
    constructor(@InjectRepository(Basket) private basketRepository: Repository<Basket>,
    @InjectRepository(Product) private productRepo: Repository<Product>  ,
    @InjectRepository(User) private userRepo: Repository<User>
  ){}

  async create(createBasketDto: CreateBasketDto) {
    const user = await this.userRepo.findOne({where:{id: createBasketDto.user_id}})
    const product = await this.productRepo.findOne({where:{id: createBasketDto.product_id}})
    
    const basket = this.basketRepository.create({...createBasketDto,user,product})
    return await this.basketRepository.save(basket)
  }

  async findAll(userId: number) {
    console.log(userId);
    
    const user = await this.userRepo.findOne({where:{id:userId}})
    const baskets = await this.basketRepository.find({where: {user},relations: ['product']})
    return baskets
  }

  async   findOne(id: number) {
    return await this.basketRepository.findOne({where:{id}})
  }

  async updateQuantity(basketId: number,updateQuantity:any){
    
    const updateBasket = await this.basketRepository.preload({id:basketId,quantity: updateQuantity})

    return await this.basketRepository.save(updateBasket)
  }

  update(id: number, updateBasketDto: UpdateBasketDto) {
    return `This action updates a #${id} basket`;
  }

  async remove(id: number) {
    return await this.basketRepository.delete(id)
  }

  async clear(userId :number){
    return await this.basketRepository.delete({user:{id: userId} })
  }
}
