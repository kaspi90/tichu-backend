// game.module.ts
import { Module } from '@nestjs/common';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { PrismaService } from './prisma.service';

@Module({
  controllers: [GameController],
  providers: [GameService, PrismaService],
  exports: [GameService],
})
export class GameModule {}
