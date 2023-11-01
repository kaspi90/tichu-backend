import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import { join } from 'path';
import * as express from 'express';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   app.enableCors({
//     origin: 'http://localhost:3000',
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true,
//   });
//   await app.listen(4000);
// }
// bootstrap();

async function bootstrap() {
  const server = express();
  server.use('/public', express.static(join(__dirname, '..', 'public')));

  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  app.enableCors({
    origin:
      'https://tichu-frontend-2rknrbi94-kaspi90.vercel.app' ||
      'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(4000);
}
bootstrap();
