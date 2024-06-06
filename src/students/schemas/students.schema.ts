import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Classes } from 'src/classes/schemas/classes.schema';
export enum StudentGender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}
@Schema()
export class Students extends Document {
  @Prop()
  name: string;

  @Prop({ unique: [true, 'Username already registered'] })
  username: string;

  @Prop({ unique: [true, 'email already registered'] })
  email: string;

  // @Prop()
  // classname: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Classes',
    // unique: [true, 'Id already Existed'],
  })
  classId: Classes; // Reference to Class document

  @Prop()
  age: string;

  @Prop()
  phoneno: string;
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
