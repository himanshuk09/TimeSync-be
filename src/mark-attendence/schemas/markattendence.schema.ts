import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Date, Document } from 'mongoose';
import { Classes } from 'src/classes/schemas/classes.schema';
import { Students } from 'src/students/schemas/students.schema';
import { Subjects } from 'src/subjects/schemas/subject.schema';
export enum StudentAttendence {
  PRESENT = 'Present',
  ABSENT = 'Absent',
  NURSING = 'Nursing',
  EMERGENCY = 'Emergency',
}
@Schema()
export class NoteAttendence extends Document {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Classes',
  })
  classId: Classes;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Students',
  })
  studentId: Students;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subjects',
  })
  subjectId: Subjects;

  @Prop({ type: Date })
  attendenceDate: Date;

  @Prop({
    enum: StudentAttendence,
    default: StudentAttendence.PRESENT,
  })
  attendenceType: StudentAttendence;

  @Prop()
  reason: string;
}

export const AttendenceSchema = SchemaFactory.createForClass(NoteAttendence);
