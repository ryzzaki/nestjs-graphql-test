import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { StudentService } from './student.service';
import { CreateStudentInput } from './inputs/student.input';
import { StudentType } from './student.type';
import { Student } from './entity/student.entity';

@Resolver(() => StudentType)
export class StudentResolver {
  constructor(private readonly studentService: StudentService) {}

  @Mutation(() => StudentType)
  createStudent(
    @Args('createStudentInput') createStudentInput: CreateStudentInput,
  ): Promise<Student> {
    return this.studentService.createStudent(createStudentInput);
  }

  @Query(() => [StudentType])
  getAllStudents(): Promise<Student[]> {
    return this.studentService.getAllStudents();
  }

  @Query(() => StudentType)
  student(@Args('id') id: string): Promise<Student> {
    return this.studentService.getStudentById(id);
  }
}
