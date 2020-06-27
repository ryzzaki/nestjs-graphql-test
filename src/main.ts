import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // use class-transformer globally for all validations
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
  Logger.log('Server running on port 3000');
}
bootstrap();
