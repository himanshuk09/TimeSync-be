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
  Put,
  NotFoundException,
} from '@nestjs/common';
import { ClassesService } from './classes.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { Classes } from './schemas/classes.schema';

@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @Get()
  async getAllCLasses(): Promise<Classes[]> {
    return this.classesService.findAll();
  }
  @Post()
  async createClass(
    @Res() response,
    @Body() teacher: CreateClassDto,
  ): Promise<Classes> {
    try {
      const newTeacher = await this.classesService.create(teacher);
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
  async getClasses(@Param('id') id: string): Promise<Classes> {
    return this.classesService.findById(id);
  }
  @Put(':id')
  async UpdateClass(
    @Param('id') id: string,
    @Body() classes: UpdateClassDto,
  ): Promise<Classes> {
    await this.classesService.findById(id);
    return this.classesService.updateById(id, classes);
  }
  @Delete(':id')
  async deleteClass(@Param('id') id: string): Promise<{ deleted: boolean }> {
    await this.classesService.findById(id);
    const deletedClass = await this.classesService.deleteById(id);
    if (deletedClass) {
      return { deleted: true };
    } else {
      throw new NotFoundException('Restaurant not found');
    }
  }
  @Get(':id')
  async getByClassId(@Param('id') id: string): Promise<Classes> {
    return this.classesService.findById(id);
  }
}
