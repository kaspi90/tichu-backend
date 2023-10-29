import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user.module';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth.module';
import { JwtMiddleware } from './middlewares/jwt.middleware';
import { UploadService } from './upload.service';
import { UploadModule } from './upload.module';
import { GameModule } from './game.module';
import { GameController } from './game.controller';
import { GameService } from './game.service';
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
