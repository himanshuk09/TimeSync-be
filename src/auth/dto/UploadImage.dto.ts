import { ApiProperty } from '@nestjs/swagger';
import { IsDefined } from 'class-validator';

export class FileUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  @IsDefined()
  image: string[];
}
