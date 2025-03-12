import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards,  Request, ForbiddenException } from '@nestjs/common';
import { BasketsService } from './baskets.service';
import { CreateBasketDto } from './dto/create-basket.dto';
import { UpdateBasketDto } from './dto/update-basket.dto';
import { RoleGuard } from 'src/common/guards/roleGuard';
import { Roles } from 'src/common/guards/roles.decorator';

@Controller('baskets')
export class BasketsController {
  constructor(private readonly basketsService: BasketsService) {}

  @UseGuards(RoleGuard)
  @Roles('user')
  @Post('add')
  create(@Body() createBasketDto: CreateBasketDto,@Request()req:any) {
    const userData = req.user 
    createBasketDto.user_id = userData.id
    return this.basketsService.create(createBasketDto);
  }

  @UseGuards(RoleGuard)
  @Roles('user')
  @Get()
  findAll(@Request()req:any) {
    const userData = req.user 
    return this.basketsService.findAll(+userData.id);
  }


  @UseGuards(RoleGuard)
  @Roles('user')
  @Patch('update/:id')
  async update(@Param('id',) id: string,@Request() req:any, @Body() updateBasketDto: UpdateBasketDto) {
    const authUser = req.user 
    const basket = await this.basketsService.findOne(+id)
    if(basket.user.id !== authUser.id){
      throw new ForbiddenException("yu cant update others'")
    }
    return this.basketsService.updateQuantity(+id, +updateBasketDto.quantity);
  }

  @UseGuards(RoleGuard)
  @Roles('user')
  @Delete('remove/:id')
  async remove(@Param('id') id: string,@Request() req:any) {
    const authUser = req.user 
    const basket = await this.basketsService.findOne(+id)
    if(basket.user.id !== authUser.id){
      throw new ForbiddenException("yu cant delete others'")
    }

    return this.basketsService.remove(+id);
  }

  @UseGuards(RoleGuard)
  @Roles('user')
  @Delete('clear')
  clear(@Request()req:any) {
    const userData = req.user 
    return this.basketsService.clear(+userData.id);
  }
}
