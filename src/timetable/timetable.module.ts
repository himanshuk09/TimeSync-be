import { Module } from '@nestjs/common';
import { TimetableService } from './timetable.service';
import { TimetableController } from './timetable.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TimetableSchema } from './schemas/timetable.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'NewTimetable',
        schema: TimetableSchema,
      },
    ]),
  ],
  controllers: [TimetableController],
  providers: [TimetableService],
})
export class TimetableModule {}
