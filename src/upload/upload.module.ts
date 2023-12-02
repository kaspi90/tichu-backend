import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [],
  controllers: [UploadController],
  providers: [UploadService, PrismaService],
  exports: [UploadService],
})
export class UploadModule {}
