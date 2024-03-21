import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema()
export class Classes extends Document {
  @Prop({ unique: [true, 'Class already registered'] })
  classname: string;

  @Prop()
  classroom: string;

  @Prop()
  description: string;
}
export const ClassesSchema = SchemaFactory.createForClass(Classes);
