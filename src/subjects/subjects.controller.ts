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
  NotFoundException,
  Put,
} from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { Subjects } from './schemas/subject.schema';

@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Get()
  async getAllCLasses(): Promise<Subjects[]> {
    return this.subjectsService.findAll();
  }
  @Post()
  async createClass(
    @Res() response,
    @Body() teacher: CreateSubjectDto,
  ): Promise<Subjects> {
    try {
      const newTeacher = await this.subjectsService.create(teacher);
      return response.status(HttpStatus.CREATED).json({
        message: 'Class has been created successfully',
        newTeacher,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Class not created!',
        error: 'Bad Request',
      });
    }
  }
  @Get(':id')
  async getClasses(@Param('id') id: string): Promise<Subjects> {
    return this.subjectsService.findById(id);
  }
  @Put(':id')
  async UpdateClass(
    @Param('id') id: string,
    @Body() subject: UpdateSubjectDto,
  ): Promise<Subjects> {
    await this.subjectsService.findById(id);
    return this.subjectsService.updateById(id, subject);
  }
  @Delete(':id')
  async deleteClass(@Param('id') id: string): Promise<{ deleted: boolean }> {
    await this.subjectsService.findById(id);
    const deletedSubject = await this.subjectsService.deleteById(id);
    if (deletedSubject) {
      return { deleted: true };
    } else {
      throw new NotFoundException('Restaurant not found');
    }
  }
}
