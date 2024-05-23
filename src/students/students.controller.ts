import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  NotFoundException,
  HttpStatus,
  Res,
  UseGuards,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Students } from './schemas/students.schema';
import { AuthGuard } from '@nestjs/passport';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get()
  // @UseGuards(AuthGuard())
  async getAllStudents(): Promise<Students[]> {
    return this.studentsService.findAll();
  }

  // @Post()
  // async createStudents(@Body() student: CreateStudentDto): Promise<Students> {
  //   return this.studentsService.create(student);
  // }

  //responce
  @Post()
  async createStudents(
    @Res() response,
    @Body() student: CreateStudentDto,
  ): Promise<Students> {
    try {
      const newStudent = await this.studentsService.create(student);
      return response.status(HttpStatus.CREATED).json({
        message: 'Student has been created successfully',
        newStudent,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Student not created!',
        error: 'Bad Request',
      });
    }
  }

  @Get(':id')
  async getStudent(@Param('id') id: string): Promise<Students> {
    return this.studentsService.findById(id);
  }

  @Put(':id')
  async UpdateStudent(
    @Param('id') id: string,
    @Body() restaurant: UpdateStudentDto,
  ): Promise<Students> {
    await this.studentsService.findById(id);
    return this.studentsService.updateById(id, restaurant);
  }

  @Delete(':id')
  async deleteStudent(@Param('id') id: string): Promise<{ deleted: boolean }> {
    await this.studentsService.findById(id);
    const deletedStudent = await this.studentsService.deleteById(id);
    if (deletedStudent) {
      return { deleted: true };
    } else {
      throw new NotFoundException('Restaurant not found');
    }
  }
}
