import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { Category } from 'src/categories/entities/category.entity';

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(Product)
      private productRepository: Repository<Product>,
      @InjectRepository(Category)
      private categoryRepo: Repository<Category>
    ){}

  async create(createProductDto: CreateProductDto) {

    const category = await this.categoryRepo.findOne({where:{id:createProductDto.categoryId}})
    console.log(createProductDto);

    
    const product = this.productRepository.create({...createProductDto,category})
    return await this.productRepository.save(product)
  }

  async findAll() {
    return await this.productRepository.find()
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({where:{id}})
    if(!product){
      throw new NotFoundException('product not found')
    }
    return product
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    await this.findOne(id)
    const product = await this.productRepository.preload({id,...updateProductDto})
    return await this.productRepository.save(product);
  }

  async remove(id: number) {
    await this.findOne(id)
    return await this.productRepository.delete(id)
  }
}
