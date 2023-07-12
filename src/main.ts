import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

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
