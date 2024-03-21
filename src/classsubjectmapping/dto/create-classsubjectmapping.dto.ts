import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDefined, IsString, ValidateNested } from 'class-validator';

export class IdsDto {
  @ApiProperty()
  @IsDefined()
  @IsString()
  id: string;
}

export class CreateClasssubjectmappingDto {
  // readonly classId: string; // Reference to Class document

  // readonly subjectId: string; // Reference to Subject document

  @ApiProperty()
  @IsDefined()
  @IsString()
  classId: string;

  @ApiProperty({ type: IdsDto, isArray: true })
  @ValidateNested({ each: true })
  @IsDefined()
  @Type(() => IdsDto)
  subjectIds: IdsDto[];
}
