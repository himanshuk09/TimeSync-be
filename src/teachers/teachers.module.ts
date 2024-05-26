import { Module } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { TeachersController } from './teachers.controller';
import { TeachersSchema } from './schemas/teachers.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { TimetableSchema } from 'src/timetable/schemas/timetable.schema';

@Module({
  imports: [
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
  controllers: [TeachersController],
  providers: [TeachersService],
})
export class TeachersModule {}
