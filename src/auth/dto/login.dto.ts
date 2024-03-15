import { PartialType } from '@nestjs/mapped-types';
import { SignUpDto } from './signup.dto';

export class LoginDto extends PartialType(SignUpDto) {}
