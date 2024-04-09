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
import { ClasssubjectmappingService } from './classsubjectmapping.service';
import { CreateClasssubjectmappingDto } from './dto/create-classsubjectmapping.dto';
import { UpdateClasssubjectmappingDto } from './dto/update-classsubjectmapping.dto';
import { ClassSubjectmapping } from './schemas/classsubmap.schema';
import { ApiBody } from '@nestjs/swagger';
import mongoose from 'mongoose';

@Controller('classsubjectmapping')
export class ClasssubjectmappingController {
  constructor(
    private readonly classsubjectmappingService: ClasssubjectmappingService,
  ) {}
  //responce
  @Post()
  @ApiBody({ type: CreateClasssubjectmappingDto })
  async createStudents(
    @Res() response,
    @Body() ClassSubjects: CreateClasssubjectmappingDto,
  ): Promise<ClassSubjectmapping> {
    try {
      const newStudent =
        await this.classsubjectmappingService.create(ClassSubjects);
      return response.status(HttpStatus.CREATED).json({
        message: 'Subject Assign to Class successfully',
        newStudent,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: ClassSubjectMapping not created!',
        error: 'Bad Request',
      });
    }
  }
  @Get()
  async getAllStudents(): Promise<ClassSubjectmapping[]> {
    return this.classsubjectmappingService.findAll();
  }
  @Get(':id')
  async findById(id: string): Promise<ClassSubjectmapping> {
    //For valid id
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException(
        'wrong mongoose ID error . Please enter correct ID',
      );
    }
    const subject = await this.classsubjectmappingService.findById(id);
    if (!subject) {
      throw new NotFoundException('Subject not found');
    }
    return subject;
  }
  @Put(':id')
  async UpdateClass(
    @Param('id') id: string,
    @Body() subject: UpdateClasssubjectmappingDto,
  ): Promise<ClassSubjectmapping> {
    await this.classsubjectmappingService.findById(id);
    return this.classsubjectmappingService.updateById(id, subject);
  }
  @Delete(':id')
  async deleteClass(@Param('id') id: string): Promise<{ deleted: boolean }> {
    await this.classsubjectmappingService.findById(id);
    const deletedSubject = await this.classsubjectmappingService.deleteById(id);
    if (deletedSubject) {
      return { deleted: true };
    } else {
      throw new NotFoundException('class subject not found');
    }
  }
}
