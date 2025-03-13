import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { RoleGuard } from 'src/common/guards/roleGuard';
import { Roles } from 'src/common/guards/roles.decorator';
import { AuthGuard } from 'src/common/guards/authGuard';

@ApiTags('Buyurtmalar') 
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(RoleGuard)
  @Roles('user')
  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'buyurtma berish' })
  @ApiResponse({ status: 201 })
  @ApiResponse({ status: 400, description: 'invalid infos' })
  create(@Body() createOrderDto: CreateOrderDto,@Request() req :any) {
    const authData = req.user;
    createOrderDto.user_id = authData.id
    return this.ordersService.create(createOrderDto);
  }

  @UseGuards(RoleGuard)
  @Roles('admin')
  @Get()
  @ApiOperation({ summary: 'view all orders' })
  @ApiResponse({ status: 200 })
  findAll() {
    return this.ordersService.findAll();
  }

  @UseGuards(RoleGuard)
  @Roles('user')
  @Get('user/:id')
  @ApiOperation({ summary: "view all orders of user" })
  @ApiResponse({ status: 200 })
  findAllOfUser(@Param('id') id: string,@Request() req: any) {
    const authData = req.user;
    return this.ordersService.findAllOfUser(+authData.id);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'view one order by id' })
  @ApiResponse({ status: 200, description: 'Order found' })
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }
}
