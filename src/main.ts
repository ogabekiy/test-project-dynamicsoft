import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path'; 
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'category_uploads'), {
    prefix: '/category_uploads',
  });

  app.useGlobalPipes(new ValidationPipe({transform: true}));

  app.useStaticAssets(join(__dirname, '..', 'categories_images'), {
    prefix: '/categories_images',
  });

  app.useStaticAssets(join(__dirname, '..', 'product_images'), {
    prefix: '/product_images',
  });

  const config = new DocumentBuilder()
  .setTitle('Test E-commerce API')
  .setDescription('API documentation for Dynamic Soft')
  .setVersion('1.0')
  .addBearerAuth() 
  .build();

const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
