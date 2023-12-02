import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Req,
  Delete,
  Param,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Delete('/:userId')
  async deleteFile(@Param('userId') userId: string) {
    const user = await this.uploadService.findUserById(userId);

    if (user?.image) {
      this.uploadService.deleteFile(user.image);
      await this.uploadService.updateUserImage(Number(userId));
      return { message: 'Image deleted successfully.' };
    } else {
      return { message: 'No image found for this user.' };
    }
  }
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
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
    }),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Req() request: any,
  ) {
    console.log('Inside controller');
    console.log('File:', file);

    const userId = request.user.userId;
    return await this.uploadService.saveFileDetails(file, userId);
  }
}
