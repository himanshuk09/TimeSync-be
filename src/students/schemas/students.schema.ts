import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export enum StudentGender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}
@Schema()
export class Students extends Document {
  @Prop()
  name: string;

  @Prop()
  username: string;

  @Prop()
  email: string;

  @Prop()
  classname: string;

  @Prop()
  age: number;

  @Prop()
  phoneno: number;
  @Prop({
    enum: StudentGender,
  })
  gender?: StudentGender;

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

export const StudentsSchema = SchemaFactory.createForClass(Students);
