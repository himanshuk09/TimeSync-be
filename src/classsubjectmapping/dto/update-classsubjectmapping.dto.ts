import { PartialType } from '@nestjs/swagger';
import { CreateClasssubjectmappingDto } from './create-classsubjectmapping.dto';

export class UpdateClasssubjectmappingDto extends PartialType(
  CreateClasssubjectmappingDto,
) {}
