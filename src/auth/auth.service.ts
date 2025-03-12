import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
@Injectable()
export class AuthService {
  constructor(private userService: UsersService){}
  async create(createAuthDto: CreateAuthDto) {

    return await this.userService.create(createAuthDto)
  }

  async login(createLoginDto: LoginAuthDto) {
    console.log(createLoginDto);
    const userData = await this.userService.findOneByEmail(createLoginDto.email)
    if(!userData){
      throw new UnauthorizedException('email or password not valid')
    }

    const isValidPassword = await bcrypt.compare(createLoginDto.password,userData.password)
    if(!isValidPassword){
      throw new UnauthorizedException('email or password not valid')
    }

    const accesToken = await jwt.sign({createLoginDto})

    return 'This action adds a new auth';
  }

  refresh(){
    return 'token'
  }

}
