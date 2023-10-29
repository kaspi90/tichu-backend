import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { PrismaService } from './prisma.service';

@Module({
  imports: [], // Add other modules as needed
  controllers: [UploadController],
  providers: [UploadService, PrismaService],
  exports: [UploadService], // Export the service if it's going to be used by other modules
})
export class UploadModule {}
