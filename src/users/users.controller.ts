import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RoleGuard } from 'src/common/guards/roleGuard';
import { Roles } from 'src/common/guards/roles.decorator';
import { AuthGuard } from 'src/common/guards/authGuard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(RoleGuard)
  @Roles('admin')
  @Get()
  async findAll(@Request() req:any) {
    // const userData = req.user   //user data
    console.log('req',req.user);
    
    return await this.usersService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string,@Request() req:any) {
    const authData = req.user
    if(authData.role !== 'admin' && authData.id !== +id){
      throw new BadRequestException("yu cant see others' profile")
    }
    return this.usersService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto,@Request() req:any) {
    const authData = req.user
    if(authData.id !== +id){
      throw new BadRequestException("yu cant update others' profile")
    }
    return this.usersService.update(+id, updateUserDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string,@Request() req:any) {
    const authData = req.user
    if(authData.id !== +id){
      throw new BadRequestException("yu cant update others' profile")
    }
    return this.usersService.remove(+id);
  }
}
