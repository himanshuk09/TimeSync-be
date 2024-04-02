import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { StudentAttendence } from '../schemas/markattendence.schema';

export class IdsDto {
  @ApiProperty()
  @IsDefined()
  @IsString()
  id: string;
}

export class CreateMarkAttendenceDto {
  @ApiProperty()
  @IsDefined()
  @IsString()
  classId: string;

  @ApiProperty({ type: IdsDto, isArray: true })
  @ValidateNested({ each: true })
  @IsDefined()
  @Type(() => IdsDto)
  studentIds: IdsDto[];

  @IsString()
  attendencedate: string;

  @IsEnum(StudentAttendence, { message: 'Please Choose correct attendence' })
  @IsNotEmpty()
  attendencetype: StudentAttendence;
}
