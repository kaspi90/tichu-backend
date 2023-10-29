// game.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from './prisma.service'; // Assuming you have a PrismaService that wraps around PrismaClient
import { CreateGameDto } from './dto/game.dto';

@Injectable()
export class GameService {
  constructor(private readonly prisma: PrismaService) {}

  async createGame(data: CreateGameDto) {
    return this.prisma.game.create({
      data,
    });
  }

  async getAllGames() {
    return this.prisma.game.findMany();
  }

  async getGameById(id: number) {
    const game = await this.prisma.game.findUnique({
      where: { id },
    });

    if (!game) throw new NotFoundException(`Game with ID ${id} not found`);

    return game;
  }

  async getGamesByUserId(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.prisma.game.findMany({
      where: {
        userId: user.id,
      },
    });
  }

  // Add other methods as needed (update, delete, etc.)
}
