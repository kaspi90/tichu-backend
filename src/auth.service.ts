import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async login(
    email: string,
    password: string,
  ): Promise<{ token: string; user: User }> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      throw new Error('Invalid password');
    }

    const payload = { userId: user.id };
    const token = jwt.sign(
      payload,
      'c79c44cbbd7e8bd432d318abbc51d01a28787a6d44300373ab5682de21b0dc6e',
    );

    return { token, user };
  }
}
