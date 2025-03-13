import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, ForbiddenException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { BasketsService } from './baskets.service';
import { CreateBasketDto } from './dto/create-basket.dto';
import { UpdateBasketDto } from './dto/update-basket.dto';
import { RoleGuard } from 'src/common/guards/roleGuard';
import { Roles } from 'src/common/guards/roles.decorator';

@ApiTags('Baskets') 
@ApiBearerAuth()
@Controller('baskets')
export class BasketsController {
  constructor(private readonly basketsService: BasketsService) {}

  @UseGuards(RoleGuard)
  @Roles('user')
  @Post('add')
  @ApiOperation({ summary: 'add a product to basket' })
  @ApiResponse({ status: 201 })
  @ApiResponse({ status: 400, description: 'innvalid input' })
  create(@Body() createBasketDto: CreateBasketDto, @Request() req: any) {
    const userData = req.user;
    createBasketDto.user_id = userData.id;
    return this.basketsService.create(createBasketDto);
  }

  @UseGuards(RoleGuard)
  @Roles('user')
  @Get()
  @ApiOperation({ summary: 'Gbaskets of user' })
  @ApiResponse({ status: 200})
  findAll(@Request() req: any) {
    const userData = req.user;
    return this.basketsService.findAll(+userData.id);
  }

  @UseGuards(RoleGuard)
  @Roles('user')
  @Patch('update/:id')
  @ApiOperation({ summary: 'Update product quantity in basket' })
  @ApiResponse({ status: 200, description: 'Basket updated' })
  @ApiResponse({ status: 403, description: "You cant update others baskets (;" })
  async update(@Param('id') id: string, @Request() req: any, @Body() updateBasketDto: UpdateBasketDto) {
    const authUser = req.user;
    const basket = await this.basketsService.findOne(+id);
    if (basket.user.id !== authUser.id) {
      throw new ForbiddenException("yu cant update others'");
    }
    return this.basketsService.updateQuantity(+id, +updateBasketDto.quantity);
  }

  @UseGuards(RoleGuard)
  @Roles('user')
  @Delete('remove/:id')
  @ApiOperation({ summary: 'remove product from basket' })
  @ApiResponse({ status: 200, description: 'basket removed' })
  @ApiResponse({ status: 403, description: "yu cant remove others' baskets" })
  async remove(@Param('id') id: string, @Request() req: any) {
    const authUser = req.user;
    const basket = await this.basketsService.findOne(+id);
    if (basket.user.id !== authUser.id) {
      throw new ForbiddenException("yu cant remove others' baskets");
    }
    return this.basketsService.remove(+id);
  }

  @UseGuards(RoleGuard)
  @Roles('user')
  @Delete('clear')
  @ApiOperation({ summary: 'clear users basket' })
  @ApiResponse({ status: 200})
  clear(@Request() req: any) {
    const userData = req.user;
    return this.basketsService.clear(+userData.id);
  }
}
