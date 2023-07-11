import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common/pipes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(5000);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  Logger.log(`Application listening on port 5000`);
}
bootstrap();
