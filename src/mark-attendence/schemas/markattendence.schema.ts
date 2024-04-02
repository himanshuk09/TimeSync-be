import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Classes } from 'src/classes/schemas/classes.schema';
import { Students } from 'src/students/schemas/students.schema';
export enum StudentAttendence {
  PRESENT = 'PRESENT',
  ABSENT = 'ABSENT',
  NURSING = 'NURSING',
  EMERGENCY = 'EMERGENCY',
}
@Schema()
export class Attendence extends Document {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Classes',
  })
  classId: Classes; // Reference to Class document

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Students',
  })
  studentId: Students; // Reference to Subject document

  @Prop()
  attendencedate: 'string';

  @Prop({
    enum: StudentAttendence,
    default: StudentAttendence.PRESENT,
  })
  attendencetype: StudentAttendence;
}

export const AttendenceSchema = SchemaFactory.createForClass(Attendence);
