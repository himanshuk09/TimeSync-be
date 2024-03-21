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
} from '@nestjs/common';
import { ClasssubjectmappingService } from './classsubjectmapping.service';
import { CreateClasssubjectmappingDto } from './dto/create-classsubjectmapping.dto';
import { UpdateClasssubjectmappingDto } from './dto/update-classsubjectmapping.dto';
import { ClassSubjectmapping } from './schemas/classsubmap.schema';
import { ApiBody } from '@nestjs/swagger';

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
}
