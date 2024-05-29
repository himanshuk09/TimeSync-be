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
  @Prop({ unique: [true, 'username already exist'] })
  username: string;
  @Prop()
  accessToken: string;
  @Prop()
  displayName: string;
  @Prop({ unique: [true, 'email already exist'] })
  email: string;
  @Prop()
  password: string;
  @Prop()
  photoURL: string;
  @Prop()
  phoneNumber: string;
  @Prop()
  country: string;
  @Prop()
  address: string;
  @Prop()
  state: string;
  @Prop()
  city: string;
  @Prop()
  zipCode: string;
  @Prop()
  about: string;
  @Prop({
    enum: UserRoles,
    default: UserRoles.ADMIN,
  })
  role?: UserRoles;
  @Prop()
  isPublic: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
