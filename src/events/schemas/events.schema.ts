import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema()
export class Events extends Document {
  @Prop()
  allDay: boolean;

  @Prop({ unique: [true, 'Event already pressent'] })
  title: string;

  @Prop()
  start: string;
  @Prop()
  end: string;
  @Prop()
  id: string;
  @Prop()
  date: string;
}
export const EventsSchema = SchemaFactory.createForClass(Events);
