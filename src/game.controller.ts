// game.controller.ts
import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { GameService } from './game.service';
import { CreateGameDto } from './dto/game.dto';
import { Request } from 'express';

@Controller('games') // This means all routes will start with '/games'
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post()
  async createGame(@Body() createGameDto: CreateGameDto) {
    return this.gameService.createGame(createGameDto);
  }

  @Get()
  async getAllGames() {
    return this.gameService.getAllGames();
  }

  @Get('my-games')
  async getMyGames(@Req() request: any): Promise<any> {
    console.log('request.user:', request.user);
    if (!request.user || !request.user.userId) {
      throw new NotFoundException('User not found or not authenticated');
    }

    const userId = request.user.userId;
    console.log('user ID', userId);
    return await this.gameService.getGamesByUserId(userId);
  }

  @Get(':id')
  async getGameById(@Param('id') id: number) {
    const game = await this.gameService.getGameById(id);

    if (!game) {
      throw new NotFoundException(`Game with ID ${id} not found`);
    }

    return game;
  }

  // You can also add other routes for update, delete, etc.
}
