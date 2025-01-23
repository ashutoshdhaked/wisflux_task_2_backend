import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { storage, CloudinaryHelper } from 'src/helper/cloudnary';
import { Student } from '../models/student.modal';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/guards/auth/auth.guard';

@Controller('student')
@UseGuards(JwtAuthGuard)
export class StudentController {
  constructor(
    private readonly studentService: StudentService,
    private readonly cloudinaryHelper: CloudinaryHelper,
  ) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: storage,
    }),
  )
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body('user') user: string,
  ): Promise<Student> {
    const imageUrl = await this.cloudinaryHelper.uploadImage(file);
    console.log({ imageUrl: imageUrl });

    const userData = JSON.parse(user);
    const studentData = { ...userData, image: imageUrl };

    return this.studentService.create(studentData);
  }

  @Get()
  async findAll(): Promise<Student[]> {
    return this.studentService.findAll();
  }

  @Get('filter/:key/:text')
  async filterStudent(
    @Param('key') key: string,
    @Param('text') text: string,
  ): Promise<Student[]> {
    return this.studentService.search(key, text);
  }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: storage,
    }),
  )
  async update(
    @UploadedFile() file: Express.Multer.File | undefined,
    @Param('id') id: string,
    @Body('user') user: string,
  ): Promise<Student> {
    let imageUrl = '';
    const userData = JSON.parse(user);
    let updateData = userData;
    if (file) {
      imageUrl = await this.cloudinaryHelper.uploadImage(file);
      updateData = { ...userData, image: imageUrl };
      console.log({ imageUrl });
    }
    return this.studentService.update(+id, updateData);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Student> {
    return this.studentService.delete(+id);
  }
}
