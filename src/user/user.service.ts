import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User, Prisma } from '@prisma/client';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    console.log('Entered user method with ID:', userWhereUniqueInput.id);

    if (isNaN(userWhereUniqueInput.id)) {
      console.error('Error: ID is NaN for input:', userWhereUniqueInput);
      throw new Error('Invalid ID value provided');
    }

    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async createUser(
    data: Prisma.UserCreateInput,
  ): Promise<{ token: string; user: User }> {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });

    const payload = { userId: user.id };

    const token = jwt.sign(
      payload,
      'c79c44cbbd7e8bd432d318abbc51d01a28787a6d44300373ab5682de21b0dc6e',
    );

    return { token, user };
  }
  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    return this.prisma.user.update({
      data,
      where,
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }
}
