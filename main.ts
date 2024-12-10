import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as http from 'http';
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
   await app.listen(process.env.PORT ?? 3001);
//   var http = require('http');

// http.createServer(function (request, response) {
// response.writeHead(200, {
//     'Content-Type': 'text/plain',
//     'Access-Control-Allow-Origin' : '*',
//     'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
// });

// }).listen(3001);
}
bootstrap();
