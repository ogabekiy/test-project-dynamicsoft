import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RoleGuard } from 'src/common/guards/roleGuard';
import { Roles } from 'src/common/guards/roles.decorator';
import { AuthGuard } from 'src/common/guards/authGuard';

@ApiTags('Users')
@ApiBearerAuth() 
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'royxatdan otish' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(RoleGuard)
  @Roles('admin')
  @Get()
  @ApiOperation({ summary: 'hamma userlarni olish(only admin)' })
  async findAll(@Request() req: any) {
    console.log('req', req.user);
    return await this.usersService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiOperation({ summary: "bitta user malumotlarini olish" })
  @ApiResponse({ status: 403, description: "Siz boshqa foydalanuvchining profilini ko‘ra olmaysiz" })
  findOne(@Param('id') id: string, @Request() req: any) {
    const authData = req.user;
    if (authData.role !== 'admin' && authData.id !== +id) {
      throw new BadRequestException("Siz boshqa foydalanuvchining profilini ko‘ra olmaysiz");
    }
    return this.usersService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: "user malumotlarini yangilash" })
  @ApiResponse({ status: 403, description: "boshqa user malumotlarini ozgartira olmaysiz" })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Request() req: any) {
    const authData = req.user;
    if (authData.id !== +id) {
      throw new BadRequestException("boshqa user malumotlarini ozgartira olmaysiz");
    }
    return this.usersService.update(+id, updateUserDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: "userni ochirish" })
  @ApiResponse({ status: 403, description: "siz o'chira olmaysiz " })
  remove(@Param('id') id: string, @Request() req: any) {
    const authData = req.user;
    if (authData.role !== 'admin' && authData.id !== +id) {
      throw new BadRequestException("siz o'chira olmaysiz ");
    }
    return this.usersService.remove(+id);
  }
}
