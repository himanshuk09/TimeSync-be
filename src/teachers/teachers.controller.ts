import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
  Put,
  NotFoundException,
} from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { Teachers } from './schemas/teachers.schema';

@Controller('teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @Get()
  async getAllTeachers(): Promise<Teachers[]> {
    return this.teachersService.findAll();
  }
  // @Post()
  // async createTeachers(@Body() teacher: CreateTeacherDto ): Promise<Teachers> {
  //   return this.teachersService.create(teacher);
  // }

  //responce
  @Post()
  async createTeachers(
    @Res() response,
    @Body() teacher: CreateTeacherDto,
  ): Promise<Teachers> {
    try {
      const newTeacher = await this.teachersService.create(teacher);
      return response.status(HttpStatus.CREATED).json({
        message: 'Teacher has been created successfully',
        newTeacher,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: teacher not created!',
        error: 'Bad Request',
      });
    }
  }
  @Get(':id')
  async getTeachers(@Param('id') id: string): Promise<Teachers> {
    return this.teachersService.findById(id);
  }
  @Put(':id')
  async UpdateTeacher(
    @Param('id') id: string,
    @Body() restaurant: UpdateTeacherDto,
  ): Promise<Teachers> {
    await this.teachersService.findById(id);
    return this.teachersService.updateById(id, restaurant);
  }
  @Delete(':id')
  async deleteTeacher(@Param('id') id: string): Promise<{ deleted: boolean }> {
    await this.teachersService.findById(id);
    const deletedTeacher = await this.teachersService.deleteById(id);
    if (deletedTeacher) {
      return { deleted: true };
    } else {
      throw new NotFoundException('Teacher not found');
    }
  }
  @Get('/subjectId/:subjectId')
  async getByClassId(
    @Param('subjectId') subjectId: string,
  ): Promise<Teachers[]> {
    return this.teachersService.getByClassId(subjectId);
  }
}
