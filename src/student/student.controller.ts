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
} from '@nestjs/common';
import { StudentService } from './student.service';
import { storage,CloudinaryHelper } from 'src/helper/cloudnary';
import { Student } from '../models/student.modal';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';

@Controller('student')
export class StudentController {
  constructor(
    private readonly studentService: StudentService,
    private readonly cloudinaryHelper: CloudinaryHelper
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
    console.log({imageUrl : imageUrl});
    
    const userData = JSON.parse(user);
    const studentData = { ...userData, image: imageUrl };

    return this.studentService.create(studentData);
  }

  @Get()
  async findAll(): Promise<Student[]> {
    return this.studentService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Student> {
    return this.studentService.findOne(+id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateData: Partial<Student>,
  ): Promise<Student> {
    return this.studentService.update(+id, updateData);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.studentService.delete(+id);
  }
}
