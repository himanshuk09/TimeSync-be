import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { Classes } from './schemas/classes.schema';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ClassesService {
  constructor(
    @InjectModel(Classes.name) private ClassesModel: Model<Classes>,
  ) {}
  async create(createTeacherDto: CreateClassDto): Promise<Classes> {
    const newClass = new this.ClassesModel(createTeacherDto);
    return newClass.save();
  }
  async findAll(): Promise<Classes[]> {
    const Classes = await this.ClassesModel.find();
    return Classes;
  }
  async findById(id: string): Promise<Classes> {
    //For valid id
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException(
        'wrong mongoose ID error . Please enter correct ID',
      );
    }
    const classes = await this.ClassesModel.findById(id);
    if (!classes) {
      throw new NotFoundException('Class not found');
    }
    return classes;
  }
  async updateById(id: string, classes: UpdateClassDto): Promise<Classes> {
    return await this.ClassesModel.findByIdAndUpdate(id, classes, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(id: string): Promise<Classes> {
    return await this.ClassesModel.findByIdAndDelete(id);
  }
}
