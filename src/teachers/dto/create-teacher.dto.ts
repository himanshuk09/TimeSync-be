import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsEnum,
  IsNumber,
} from 'class-validator';
import { StudentGender } from 'src/students/schemas/students.schema';

export class CreateTeacherDto {
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
  // subject: string;

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
