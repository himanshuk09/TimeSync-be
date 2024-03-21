import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema()
export class Subjects extends Document {
  @Prop()
  subject: string;

  @Prop()
  description: string;
}

export const SubjectSchema = SchemaFactory.createForClass(Subjects);
