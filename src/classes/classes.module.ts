import { Module } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { ClassesController } from './classes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TeachersSchema } from 'src/teachers/schemas/teachers.schema';
import { ClassesSchema } from './schemas/classes.schema';
import { ClassSubjectSchema } from 'src/classsubjectmapping/schemas/classsubmap.schema';
import { StudentsSchema } from 'src/students/schemas/students.schema';
import { TimetableSchema } from 'src/timetable/schemas/timetable.schema';
import { AttendenceSchema } from 'src/mark-attendence/schemas/markattendence.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Classes',
        schema: ClassesSchema,
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
        name: 'Students',
        schema: StudentsSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: 'NewTimetable',
        schema: TimetableSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: 'NoteAttendence',
        schema: AttendenceSchema,
      },
    ]),
  ],
  controllers: [ClassesController],
  providers: [ClassesService],
})
export class ClassesModule {}
