import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import { ConfigService } from 'src/common/config/config.service';
@Injectable()
export class AuthService {
  constructor(private userService: UsersService,private configService: ConfigService){}
  async create(createAuthDto: CreateAuthDto) {
    return await this.userService.create(createAuthDto)
  }

  async login(createLoginDto: LoginAuthDto) {
    console.log(createLoginDto);
    const userData = await this.userService.findOneByEmail(createLoginDto.email)
    if(!userData){
      throw new UnauthorizedException('email or password not valid1')
    }


    const isValidPassword = await bcrypt.compare(createLoginDto.password,userData.password)
    if(!isValidPassword){
      throw new UnauthorizedException('email or password not valid')
    }


    console.log(this.configService.get('JWT_ACCESS_TOKEN'));
    
    const accesToken = await jwt.sign({createLoginDto},this.configService.get('JWT_ACCESS_TOKEN'),{expiresIn: '1h'})
    const refreshToken = await jwt.sign({createLoginDto},this.configService.get('JWT_REFRESH_TOKEN'),{expiresIn: '7d'})

    return {data: userData, accesToken,refreshToken}
  }

  async refresh(refreshToken:string){
    if (!refreshToken) {
      throw new UnauthorizedException('refresh token is required');
    }

    try {
      const decoded = jwt.verify(refreshToken,this.configService.get('JWT_REFRESH_TOKEN'),) as { email: string; sub: number };

      const user = await this.userService.findOneByEmail(decoded.email);
      
      const payload = { email: user.email, sub: user.id };
      const newAccessToken = jwt.sign(
        payload,
        this.configService.get('JWT_ACCESS_TOKEN'),
        { expiresIn: '1h' },
      );

      return { accessToken: newAccessToken };
    } catch (error) {
      throw new UnauthorizedException('invalid or expired refresh token');
    }
  }

}
