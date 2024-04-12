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
  BadRequestException,
  NotFoundException,
  Put,
} from '@nestjs/common';
import { MarkAttendenceService } from './mark-attendence.service';
import { CreateMarkAttendenceDto } from './dto/create-mark-attendence.dto';
import { UpdateMarkAttendenceDto } from './dto/update-mark-attendence.dto';
import { ApiBody } from '@nestjs/swagger';
import { NoteAttendence } from './schemas/markattendence.schema';
import mongoose from 'mongoose';

@Controller('mark-attendence')
export class MarkAttendenceController {
  constructor(private readonly markAttendenceService: MarkAttendenceService) {}

  @Post()
  @ApiBody({ type: CreateMarkAttendenceDto })
  async NoteAttendence(
    @Res() response,
    @Body() createTimetable: CreateMarkAttendenceDto[],
  ): Promise<NoteAttendence> {
    try {
      const newTimetable =
        await this.markAttendenceService.create(createTimetable);
      return response.status(HttpStatus.CREATED).json({
        message: 'Attendence Noted',
        newTimetable,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Unable to  Note Attendence!',
        error: 'Bad Request',
      });
    }
  }
  @Get(':classId/:subjectId/:attendenceDate')
  async getByClassIdSubjectIdAndDate(
    @Param('classId') classId: string,
    @Param('subjectId') subjectId: string,
    @Param('attendenceDate') attendenceDate: Date,
  ): Promise<NoteAttendence[]> {
    return this.markAttendenceService.getByClassIdSubjectIdAndDate(
      classId,
      subjectId,
      attendenceDate,
    );
  }

  @Get('class/:classId/subject/:subjectId')
  async getByClassIdAndSubjectId(
    @Param('classId') classId: string,
    @Param('subjectId') subjectId: string,
  ) {
    return this.markAttendenceService.getByClassIdAndSubjectId(
      classId,
      subjectId,
    );
  }

  @Get('students/:classId')
  async getByClassId(
    @Param('classId') classId: string,
  ): Promise<NoteAttendence[]> {
    return this.markAttendenceService.getStudentsByClassId(classId);
  }
  @Get()
  async getAll(): Promise<NoteAttendence[]> {
    return this.markAttendenceService.findAll();
  }
  @Put(':id')
  async UpdateClass(
    @Param('id') id: string,
    @Body() classes: UpdateMarkAttendenceDto,
  ): Promise<NoteAttendence> {
    await this.markAttendenceService.findById(id);
    return this.markAttendenceService.updateById(id, classes);
  }
}
