import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as fs from 'fs';

@Injectable()
export class UploadService {
  constructor(private readonly prisma: PrismaService) {}

  public multerConfig = {
    storage: diskStorage({
      destination: './public/',
      filename: (req, file, cb) => {
        const name = file.originalname.split('.')[0];
        const fileExtName = extname(file.originalname);
        const randomName = Array(4)
          .fill(null)
          .map(() => Math.round(Math.random() * 16).toString(16))
          .join('');
        cb(null, `${name}-${randomName}${fileExtName}`);
      },
    }),
  };

  public deleteFile(filePath: string) {
    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
        console.log(`Deleted file: ${filePath}`);
      } catch (err) {
        console.error(`Error while deleting file: ${err}`);
      }
    } else {
      console.warn(`File not found: ${filePath}`);
    }
  }

  async saveFileDetails(file: Express.Multer.File, userId: number) {
    console.log('File Path:', file.path);

    const existingUser = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (existingUser?.image) {
      this.deleteFile(existingUser.image);
    }

    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: {
        image: file.path,
        imageName: file.originalname,
        imageType: file.mimetype,
        imageSize: file.size,
      },
    });

    return updatedUser;
  }

  async findUserById(userId: string) {
    return this.prisma.user.findUnique({
      where: {
        id: Number(userId),
      },
    });
  }

  async updateUserImage(userId: number) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        image: null,
        imageName: null,
        imageType: null,
        imageSize: null,
      },
    });
  }
}
