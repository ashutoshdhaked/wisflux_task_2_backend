import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Student } from '../models/student.modal';
import { Op } from 'sequelize';

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
    return this.studentModel.create(completeData);
  }

  async findAll(): Promise<Student[]> {
    return  this.studentModel.findAll();
  }

  async findOne(id: number): Promise<Student> {
    const student = await this.studentModel.findByPk(id);
    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
    return student;
  }

  async search(key: string, text: string): Promise<Student[]> {
    if (!text || !key) {
      return this.findAll();
    }

    let query = {};
    if(key === "semester"){
      query = {
        where :{
          "semester" : parseInt(text)
        }
      }
    }
     else{
      query = {
        where: {
          [key]: {
            [Op.like]: `%${text}%`,
          },
        },
      };
     }
    return  this.studentModel.findAll(query);
  }

  async update(id: number, updateData: Partial<Student>): Promise<Student> {
    const student = await this.findOne(id);
    return student.update(updateData);
  }

  async delete(id: number): Promise<Student> {
    const student = await this.findOne(id);
    await student.destroy();
    return student;
  }
}
