import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Student } from '../models/student.modal';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student)
    private readonly studentModel: typeof Student,
  ) {}

  async create(studentData: Partial<Student>): Promise<Student> {
    if (!studentData.name) {
      throw new Error('Name is required');
    }
    const completeData = {
      ...studentData,
      name: studentData.name,
    } as Student;
    return await this.studentModel.create(completeData);
  }

  async findAll(): Promise<Student[]> {
    return  await this.studentModel.findAll();
  }

  async findOne(id: number): Promise<Student> {
    const student = await this.studentModel.findByPk(id);
    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
    return student;
  }

  async update(id: number, updateData: Partial<Student>): Promise<Student> {
    const student = await this.findOne(id);
    return student.update(updateData);
  }

  async delete(id: number): Promise<void> {
    const student = await this.findOne(id);
    await student.destroy();
  }

}
