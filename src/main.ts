import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: {
    origin:"*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
  }});
  
  app.setGlobalPrefix('api')

  app.enableCors({
    origin:"*",
    methods:["GET", "POST", "PUT", "PATCH", "DELETE"]
  })
  await app.listen(3001);
}
bootstrap();
