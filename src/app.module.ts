import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { JwtMiddleware } from './middlewares/jwt.middleware';
import { UploadService } from './upload/upload.service';
import { UploadModule } from './upload/upload.module';
import { GameModule } from './game/game.module';
import { GameService } from './game/game.service';

@Module({
  imports: [UserModule, AuthModule, UploadModule, GameModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, UploadService, GameService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
