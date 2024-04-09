import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Res,
  Query,
  ValidationPipe,
  NotFoundException,
} from '@nestjs/common';
import { TimetableService } from './timetable.service';
import { CreateTimetableDto } from './dto/create-timetable.dto';
import { ApiBody } from '@nestjs/swagger';
import { NewTimetable } from './schemas/timetable.schema';
import { IsString } from 'class-validator';
export class GetByClassIdDto {
  @IsString()
  classId: any;
}
@Controller('timetable')
export class TimetableController {
  constructor(private readonly timetableService: TimetableService) {}

  @Post()
  @ApiBody({ type: CreateTimetableDto })
  async createTimetable(
    @Res() response,
    @Body() createTimetable: CreateTimetableDto[],
  ): Promise<NewTimetable> {
    try {
      const newTimetable = await this.timetableService.create(createTimetable);
      return response.status(HttpStatus.CREATED).json({
        message: 'Timetable Created',
        newTimetable,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Unable to  created timetable!',
        error: 'Bad Request',
      });
    }
  }
  @Get()
  async getAllTimetable(): Promise<NewTimetable[]> {
    return this.timetableService.findAll();
  }

  @Get('/class/:classId')
  async getByClassId(
    @Param('classId') classId: string,
  ): Promise<NewTimetable[]> {
    return this.timetableService.getByClassId(classId);
  }

  @Get('/class-names')
  async getClassNames(): Promise<any[]> {
    const documents: NewTimetable[] = await this.timetableService.findAll();
    return this.timetableService.getClassNames(documents);
  }

  @Delete(':classId')
  deleteClass(@Param('classId') classId: string, @Res() response) {
    const deletedTimetable = this.timetableService.deleteClass(classId);
    if (deletedTimetable) {
      return response.status(HttpStatus.CREATED).json({
        message: 'Timetable Deleted successfully',
        status: 200,
      });
    } else {
      throw new NotFoundException('Timetable not found');
    }
  }
}
