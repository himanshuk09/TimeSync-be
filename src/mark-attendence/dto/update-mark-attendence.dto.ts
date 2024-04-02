import { PartialType } from '@nestjs/swagger';
import { CreateMarkAttendenceDto } from './create-mark-attendence.dto';

export class UpdateMarkAttendenceDto extends PartialType(CreateMarkAttendenceDto) {}
