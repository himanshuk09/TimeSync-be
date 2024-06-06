import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Subjects } from 'src/subjects/schemas/subject.schema';
export enum TeacherGender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}
@Schema()
export class Teachers extends Document {
  @Prop()
  name: string;

  @Prop({ unique: [true, 'Username already registered'] })
  username: string;

  @Prop({ unique: [true, 'email already registered'] })
  email: string;

  @Prop()
  age: string;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subjects',
    // unique: [true, 'Id already Existed'],
  })
  subjectId: Subjects; // Reference to Class document

  // @Prop()
  // subject: string;
  @Prop()
  phoneno: string;
  @Prop({
    enum: TeacherGender,
  })
  gender?: TeacherGender;

  @Prop({ type: Object })
  address?: {
    street: String;
    city: String;
    state: String;
    zip: String;
  };

  @Prop()
  avatar?: string;
}

export const TeachersSchema = SchemaFactory.createForClass(Teachers);
