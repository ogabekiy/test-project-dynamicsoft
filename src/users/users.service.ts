import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs'
@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>){}

  async create(createUserDto: CreateUserDto) {

    const userData = await this.findOneByEmail(createUserDto.email)

    if(userData){
      throw new ConflictException('this email is used before')
    }

    createUserDto.password = await bcrypt.hash(createUserDto.password,10)

    const user = this.userRepository.create(createUserDto)
    return await this.userRepository.save(user); 
  }

  async findAll() {
    return await this.userRepository.find()
  }

  async findOne(id: number) {
    const user = this.userRepository.findOne({where:{id}})
    if(!user){
      throw new NotFoundException('user not found')
    }
    return user
  }

  async findOneByEmail(email: string) {
    const user = this.userRepository.findOne({where:{email}})
    if(!user){
      throw new NotFoundException('user not found')
    }
    return user
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.findOne(id)
    const user = await this.userRepository.preload({
      id,
      ...updateUserDto,
    });
    return await this.userRepository.save(user); 
  }
  

  async remove(id: number) {
    await this.userRepository.delete(id)
    return { message: `User #${id} deleted successfully` };
  }
}
