import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['*'],         // Allow only requests from localhost:3000
     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
     allowedHeaders: ['Content-Type', 'Authorization', 'X-Custom-Header'], // Allowed headers
     exposedHeaders: ['X-Custom-Header'],
     maxAge: 3600, // Cache preflight requests for 1 hour
     preflightContinue: false, // Automatically handle preflight request
     });
  await app.listen(process.env.PORT ?? 3002);
}
bootstrap();
