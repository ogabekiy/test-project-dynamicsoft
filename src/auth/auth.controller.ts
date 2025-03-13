import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';

@ApiTags('Authentication') 
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'register' })
  @ApiResponse({ status: 201 })
  @ApiResponse({ status: 400, description: 'invalid input' })
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'login' })
  @ApiResponse({ status: 200, description: 'return tokens' })
  login(@Body() createLoginDto: LoginAuthDto) {
    return this.authService.login(createLoginDto);
  }

  @Post('refresh')
  @ApiOperation({ summary: 'refresh acces token' })
  @ApiResponse({ status: 200 })
  refresh(@Body('refreshToken') refreshToken: string) {
    return this.authService.refresh(refreshToken);
  }
}
