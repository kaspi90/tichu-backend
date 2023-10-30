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
    origin: 'http://localhost:3000 || https://tichu-frontend.vercel.app/',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(4000);
}
bootstrap();
