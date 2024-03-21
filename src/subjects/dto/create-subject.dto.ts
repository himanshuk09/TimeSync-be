import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSubjectDto {
  @IsString()
  @IsNotEmpty()
  readonly subject: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
