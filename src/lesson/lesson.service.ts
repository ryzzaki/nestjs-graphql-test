import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from './entity/lesson.entity';
import * as uuid from 'uuid';
import { CreateLessonInput } from './inputs/lesson.input';

@Injectable()
export class LessonService {
  constructor(
    // lazy code writer - inject the default repository
    @InjectRepository(Lesson)
    private readonly lessonRepository: Repository<Lesson>,
  ) {}

  async createLesson(createLessonInput: CreateLessonInput): Promise<Lesson> {
    const id = uuid.v4();
    const { name, startDate, endDate, students } = createLessonInput;
    const lesson = this.lessonRepository.create({
      id,
      name,
      startDate,
      endDate,
      students,
    });
    return this.lessonRepository.save(lesson);
  }

  async getLessonById(id: string): Promise<Lesson> {
    return this.lessonRepository.findOne({ id });
  }

  async getAllLessons(): Promise<Lesson[]> {
    return this.lessonRepository.find();
  }

  async assignStudentsToLesson(
    lessonId: string,
    studentIds: string[],
  ): Promise<Lesson> {
    const lesson = await this.lessonRepository.findOne({ id: lessonId });
    lesson.students = [...lesson.students, ...studentIds];
    return this.lessonRepository.save(lesson);
  }
}
