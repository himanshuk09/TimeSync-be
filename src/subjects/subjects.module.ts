import { Module } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { SubjectsController } from './subjects.controller';
import { SubjectSchema } from './schemas/subject.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ClassSubjectSchema } from 'src/classsubjectmapping/schemas/classsubmap.schema';
import { TeachersSchema } from 'src/teachers/schemas/teachers.schema';
import { TimetableSchema } from 'src/timetable/schemas/timetable.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Subjects',
        schema: SubjectSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: 'ClassSubjectmapping',
        schema: ClassSubjectSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: 'Teachers',
        schema: TeachersSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: 'NewTimetable',
        schema: TimetableSchema,
      },
    ]),
  ],
  controllers: [SubjectsController],
  providers: [SubjectsService],
})
export class SubjectsModule {}
