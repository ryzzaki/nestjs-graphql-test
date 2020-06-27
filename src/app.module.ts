import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { LessonModule } from './lesson/lesson.module';
import { StudentModule } from './student/student.module';
import { Lesson } from './lesson/entity/lesson.entity';
import { Student } from './student/entity/student.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://localhost/school',
      synchronize: true,
      useUnifiedTopology: true,
      entities: [Lesson, Student],
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      path: '/api/graphql',
    }),
    LessonModule,
    StudentModule,
  ],
})
export class AppModule {}
