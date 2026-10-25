import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS: izinkan Nuxt (port 3000) memanggil API
  app.enableCors({
    origin: process.env.CORS_ORIGIN ?? 'http://localhost:3000',
  });

  // Bentuk response error yang konsisten
  app.useGlobalFilters(new AllExceptionsFilter());

  // Validasi input di semua endpoint
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // buang properti yang tidak ada di DTO
      forbidNonWhitelisted: true, // tolak request yang membawa properti tak dikenal
      transform: true, // ubah query/body menjadi instance DTO dan tipe yang benar
    }),
  );

  // Swagger di /docs
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Pilot App API')
    .setDescription('REST API for the pilot dashboard')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  SwaggerModule.setup(
    'docs',
    app,
    SwaggerModule.createDocument(app, swaggerConfig),
  );

  await app.listen(process.env.PORT ?? 3001);
}
void bootstrap();
