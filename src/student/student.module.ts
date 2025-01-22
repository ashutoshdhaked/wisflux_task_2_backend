import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Student } from 'src/models/student.modal';
import { CloudinaryHelper } from 'src/helper/cloudnary';


@Module({
  imports: [
    SequelizeModule.forFeature([Student]),
  ],
  providers: [StudentService,CloudinaryHelper],
  controllers: [StudentController]
})
export class StudentModule {}

