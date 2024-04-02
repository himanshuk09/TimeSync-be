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
import { Attendence } from './schemas/markattendence.schema';
import mongoose from 'mongoose';

@Controller('mark-attendence')
export class MarkAttendenceController {
  constructor(private readonly markAttendenceService: MarkAttendenceService) {}
  //responce
  @Post()
  @ApiBody({ type: CreateMarkAttendenceDto })
  async createStudents(
    @Res() response,
    @Body() ClassSubjects: CreateMarkAttendenceDto,
  ): Promise<CreateMarkAttendenceDto> {
    try {
      const newStudent = await this.markAttendenceService.create(ClassSubjects);
      return response.status(HttpStatus.CREATED).json({
        message: 'Attendence Registered',
        newStudent,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Unable to Registered Attendence',
        error: 'Bad Request',
      });
    }
  }
  @Get()
  async getAllStudents(): Promise<Attendence[]> {
    return this.markAttendenceService.findAll();
  }
  @Get(':id')
  async findById(id: string): Promise<Attendence> {
    //For valid id
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException(
        'wrong mongoose ID error . Please enter correct ID',
      );
    }
    const subject = await this.markAttendenceService.findById(id);
    if (!subject) {
      throw new NotFoundException('Subject not found');
    }
    return subject;
  }
  @Put(':id')
  async UpdateClass(
    @Param('id') id: string,
    @Body() subject: UpdateMarkAttendenceDto,
  ): Promise<Attendence> {
    await this.markAttendenceService.findById(id);
    return this.markAttendenceService.updateById(id, subject);
  }
  @Delete(':id')
  async deleteClass(@Param('id') id: string): Promise<{ deleted: boolean }> {
    await this.markAttendenceService.findById(id);
    const deletedSubject = await this.markAttendenceService.deleteById(id);
    if (deletedSubject) {
      return { deleted: true };
    } else {
      throw new NotFoundException('Restaurant not found');
    }
  }
}
