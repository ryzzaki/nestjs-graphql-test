import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entity/student.entity';
import { Repository } from 'typeorm';
import { CreateStudentInput } from './inputs/student.input';
import * as uuid from 'uuid';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  async createStudent(
    createStudentInput: CreateStudentInput,
  ): Promise<Student> {
    const { firstName, lastName } = createStudentInput;
    const id = uuid.v4();
    const student = this.studentRepository.create({
      id,
      firstName,
      lastName,
    });
    return this.studentRepository.save(student);
  }

  async getAllStudents(): Promise<Student[]> {
    return this.studentRepository.find();
  }

  async getStudentById(id: string): Promise<Student> {
    return this.studentRepository.findOne({ id });
  }
}
