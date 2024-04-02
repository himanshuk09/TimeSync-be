import { PartialType } from '@nestjs/mapped-types';
import { SignUpDto } from './signup.dto';
import { IsNotEmpty, IsEmail, IsString, MinLength } from 'class-validator';

// export class LoginDto extends PartialType(SignUpDto) {}
export class LoginDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email address' })
  readonly email: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  readonly password: string;
}
