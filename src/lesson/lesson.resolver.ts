import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { LessonType } from './lesson.type';
import { LessonService } from './lesson.service';
import { CreateLessonInput } from './inputs/lesson.input';
import { Lesson } from './entity/lesson.entity';
import { AssignStudentsToLessonInput } from './inputs/assignStudentsToLesson.input';
import { StudentService } from 'src/student/student.service';
import { Student } from 'src/student/entity/student.entity';

@Resolver(() => LessonType)
export class LessonResolver {
  constructor(
    private readonly lessonService: LessonService,
    private readonly studentService: StudentService,
  ) {}
  @Query(() => LessonType)
  lesson(@Args('id') id: string): Promise<Lesson> {
    return this.lessonService.getLessonById(id);
  }

  @Query(() => [LessonType])
  getAllLessons(): Promise<Lesson[]> {
    return this.lessonService.getAllLessons();
  }

  @Mutation(() => LessonType)
  createLesson(
    @Args('createLessonInput') createLessonInput: CreateLessonInput,
  ): Promise<Lesson> {
    return this.lessonService.createLesson(createLessonInput);
  }

  @Mutation(() => LessonType)
  assignStudentsToLesson(
    @Args('assignStudentsToLessonInput')
    assignStudentsToLessonInput: AssignStudentsToLessonInput,
  ): Promise<Lesson> {
    const { lessonId, studentIds } = assignStudentsToLessonInput;
    return this.lessonService.assignStudentsToLesson(lessonId, studentIds);
  }

  @ResolveField()
  async students(@Parent() lesson: Lesson): Promise<Student[]> {
    return this.studentService.getManyStudents(lesson.students);
  }
}
