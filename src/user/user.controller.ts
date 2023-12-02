import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User, Prisma } from '@prisma/client';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  async getCurrentUser(@Req() request: Express.Request): Promise<User> {
    let userId;

    try {
      userId = Number(request.user.userId);

      if (isNaN(userId)) {
        throw new Error('UserID parsed is NaN');
      }

      return this.userService.user({ id: userId });
    } catch (err) {
      throw err;
    }
  }

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<User> {
    return this.userService.user({ id: Number(id) });
  }

  @Post()
  async createUser(
    @Body() userData: Prisma.UserCreateInput,
  ): Promise<{ token: string; user: User }> {
    return this.userService.createUser(userData);
  }
  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() userData: Prisma.UserUpdateInput,
  ): Promise<User> {
    return this.userService.updateUser({
      where: { id: Number(id) },
      data: userData,
    });
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<User> {
    return this.userService.deleteUser({ id: Number(id) });
  }
}
