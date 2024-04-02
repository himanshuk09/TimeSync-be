import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { StudentGender } from '../schemas/students.schema';

export class CreateStudentDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @IsEmail({}, { message: 'Please enter valid email address' })
  @IsNotEmpty()
  readonly email: string;

  // @IsString()
  // @IsNotEmpty()
  // readonly classname: string;

  readonly subjectId: string;

  @IsNotEmpty()
  readonly age: string;

  @IsEnum(StudentGender, { message: 'Please enter correct gender' })
  @IsNotEmpty()
  readonly gender?: StudentGender;

  @IsNotEmpty()
  readonly phoneno: string;

  readonly address: {
    street: String;
    city: String;
    state: String;
    zip: String;
  };

  @IsString()
  avatar?: string;
}

// {
//   "name":"himanshu",
//   "username":"himanshu",
//   "email":"himanshu@gmail.com",
//   "classname":"Class V",
//   "age":10,
//   "gender":"male",
//   "phoneno":9876543219,
//   "address":{
//   "street":"abc",
//   "city":"ngp",
//   "state":"MH",
//   "zip":"ABC123"
//   },
//   "avatar":"abc"
//   }
