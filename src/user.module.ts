import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from './prisma.module';
import { UploadModule } from './upload.module';

@Module({
  imports: [PrismaModule, UploadModule], // import PrismaModule here
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
