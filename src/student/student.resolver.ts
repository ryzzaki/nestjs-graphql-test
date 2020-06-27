/* eslint-disable @typescript-eslint/no-unused-vars */
import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { StudentService } from './student.service';
import { CreateStudentInput } from './inputs/student.input';
import { StudentType } from './student.type';
import { Student } from './entity/student.entity';

@Resolver(of => StudentType)
export class StudentResolver {
  constructor(private readonly studentService: StudentService) {}

  @Mutation(returns => StudentType)
  createStudent(
    @Args('createStudentInput') createStudentInput: CreateStudentInput,
  ): Promise<Student> {
    return this.studentService.createStudent(createStudentInput);
  }

  @Query(returns => [StudentType])
  getAllStudents(): Promise<Student[]> {
    return this.studentService.getAllStudents();
  }

  @Query(returns => StudentType)
  student(@Args('id') id: string): Promise<Student> {
    return this.studentService.getStudentById(id);
  }
}
