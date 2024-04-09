import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDefined, IsString, ValidateNested } from 'class-validator';

export class CreateTimetableDto {
  // readonly classId: string; // Reference to Class document

  // readonly subjectId: string; // Reference to Subject document

  @IsDefined()
  @IsString()
  classId: string;

  @IsDefined()
  @IsString()
  subjectId: string;

  @IsDefined()
  @IsString()
  teacherId: string;

  @IsDefined()
  @IsString()
  day: string;

  @IsDefined()
  @IsString()
  period: string;
}
