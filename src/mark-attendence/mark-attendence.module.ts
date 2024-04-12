import { Module } from '@nestjs/common';
import { MarkAttendenceService } from './mark-attendence.service';
import { MarkAttendenceController } from './mark-attendence.controller';
import { AttendenceSchema } from './schemas/markattendence.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'NoteAttendence',
        schema: AttendenceSchema,
      },
    ]),
  ],
  controllers: [MarkAttendenceController],
  providers: [MarkAttendenceService],
})
export class MarkAttendenceModule {}
