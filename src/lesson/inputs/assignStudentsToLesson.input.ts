import { InputType, Field, ID } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class AssignStudentsToLessonInput {
  @IsUUID('4')
  @Field(() => ID)
  lessonId: string;

  @IsUUID('4', { each: true })
  @Field(() => [ID])
  studentIds: string[];
}
