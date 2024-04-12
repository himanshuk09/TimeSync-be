import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDefined,
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateMarkAttendenceDto {
  @IsDefined()
  @IsString()
  readonly classId: string;
  @IsDefined()
  @IsString()
  readonly studentId: string;
  @IsDefined()
  @IsString()
  readonly subjectId: string;

  @ApiProperty()
  @IsDefined()
  @IsISO8601()
  readonly attendenceDate: Date;

  @IsDefined()
  @IsString()
  readonly attendenceType: string;
  @IsDefined()
  @IsString()
  readonly reason: string;
}
