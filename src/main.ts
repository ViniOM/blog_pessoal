import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

const PORT: number = 3000;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  process.env.TZ = '-03:00';

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  await app.listen(PORT);
  console.log(`Listening on http://localhost:${PORT}`);
}
bootstrap();
