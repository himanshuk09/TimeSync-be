import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
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
  age: number;

  @Prop()
  subject: string;
  @Prop()
  phoneno: number;
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
