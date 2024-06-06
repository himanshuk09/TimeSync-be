import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Classes } from 'src/classes/schemas/classes.schema';
import { Subjects } from 'src/subjects/schemas/subject.schema';
import { Teachers } from 'src/teachers/schemas/teachers.schema';

@Schema()
export class NewTimetable extends Document {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Classes',
    // unique: [true, 'Id already Existed'],
  })
  classId: Classes; // Reference to Class document

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subjects',
    // unique: [true, 'Subject already Existed'],
  })
  subjectId: Subjects; // Reference to Subject document

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teachers',
    // unique: [true, 'Teacher already Existed'],
  })
  teacherId: Teachers; // Reference to Teacher document

  @Prop()
  day: string;

  @Prop()
  period: string;
}

export const TimetableSchema = SchemaFactory.createForClass(NewTimetable);
