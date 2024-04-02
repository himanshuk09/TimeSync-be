import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class SignUpDto {
  // @IsNotEmpty()
  // @IsString()
  // readonly name: string;

  // @IsNotEmpty()
  // @IsEmail({}, { message: 'Please enter correct email address' })
  // readonly email: string;

  // @IsNotEmpty()
  // @IsString()
  // @MinLength(8)
  // readonly password: string;

  // readonly role?: string;
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  readonly accessToken: string;
  @IsNotEmpty()
  @IsString()
  readonly displayName: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email address' })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  readonly photoURL: string;

  @IsNotEmpty()
  @IsString()
  readonly phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  readonly country: string;

  @IsNotEmpty()
  @IsString()
  readonly address: string;

  @IsNotEmpty()
  @IsString()
  readonly state: string;
  @IsNotEmpty()
  @IsString()
  readonly city: string;
  @IsNotEmpty()
  @IsString()
  readonly zipCode: string;

  @IsNotEmpty()
  @IsString()
  readonly about: string;

  @IsNotEmpty()
  readonly isPublic: boolean;
}
