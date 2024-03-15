import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export enum UserRoles {
  ADMIN = 'admin',
  USER = 'user',
  TEACHER = 'teacher',
}

export enum UserGender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}
@Schema()
export class User extends Document {
  @Prop()
  name: string;

  @Prop({ unique: [true, 'Duplicate email entered'] })
  email: string;

  @Prop({ unique: [true, 'username already exist'] })
  username: string;

  @Prop()
  password: string;

  @Prop({
    enum: UserRoles,
    default: UserRoles.ADMIN,
  })
  role?: UserRoles;
  @Prop({
    enum: UserGender,
  })
  gender?: UserGender;
}

export const UserSchema = SchemaFactory.createForClass(User);
