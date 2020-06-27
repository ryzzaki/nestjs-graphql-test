/* eslint-disable @typescript-eslint/no-unused-vars */
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { LessonType } from './lesson.type';
import { LessonService } from './lesson.service';
import { CreateLessonInput } from './inputs/lesson.input';
import { Lesson } from './entity/lesson.entity';

@Resolver(of => LessonType)
export class LessonResolver {
  constructor(private readonly lessonService: LessonService) {}
  @Query(returns => LessonType)
  lesson(@Args('id') id: string): Promise<Lesson> {
    return this.lessonService.getLessonById(id);
  }

  @Query(returns => [LessonType])
  getAllLessons(): Promise<Lesson[]> {
    return this.lessonService.getAllLessons();
  }

  @Mutation(returns => LessonType)
  createLesson(
    @Args('createLessonInput') createLessonInput: CreateLessonInput,
  ): Promise<Lesson> {
    return this.lessonService.createLesson(createLessonInput);
  }
}
