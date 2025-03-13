import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiConsumes, ApiBearerAuth } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { RoleGuard } from 'src/common/guards/roleGuard';
import { Roles } from 'src/common/guards/roles.decorator';

@ApiTags('Products') 
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(RoleGuard)
  @Roles('admin')
  @Post()
  @ApiBearerAuth() // Requires authentication
  @ApiOperation({ summary: 'Create a new product (Admin only)' })
  @ApiConsumes('multipart/form-data') // Indicates file upload support
  @ApiResponse({ status: 201, description: 'Product created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './product_images',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        callback(null, `product-${uniqueSuffix}${ext}`);
      },
    }),
  }))
  async create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    if (file) {
      createProductDto.image = `/product_images/${file.filename}`;
    }
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'view all products' })
  @ApiResponse({ status: 200})
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'view product by id' })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 404, description: 'product not found' })
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @UseGuards(RoleGuard)
  @Roles('admin')
  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'update product (admin only)' })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 404, description: 'product not found' })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @UseGuards(RoleGuard)
  @Roles('admin')
  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'remove product (admin only)' })
  @ApiResponse({ status: 200, description: 'product deleted successfully' })
  @ApiResponse({ status: 404, description: 'product not found' })
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
