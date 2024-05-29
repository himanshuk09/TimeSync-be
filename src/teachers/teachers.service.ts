import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { Teachers } from './schemas/teachers.schema';
import mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { NewTimetable } from 'src/timetable/schemas/timetable.schema';

@Injectable()
export class TeachersService {
  constructor(
    @InjectModel(Teachers.name)
    private TeachersModel: mongoose.Model<Teachers>,
    @InjectModel(NewTimetable.name)
    private TimetableModel: mongoose.Model<NewTimetable>,
  ) {}

  async create(createTeacherDto: CreateTeacherDto): Promise<Teachers> {
    const newTeacher = new this.TeachersModel(createTeacherDto);
    return newTeacher.save();
  }

  //get All teacher => GEt
  async findAll(): Promise<Teachers[]> {
    const Teachers = await this.TeachersModel.find().populate('subjectId'); // Populate the 'classId' field with the corresponding Class document
    return Teachers;
  }

  //Get Teachers by id : get
  async findById(id: string): Promise<Teachers> {
    //For valid id
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException(
        'wrong mongoose ID error . Please enter correct ID',
      );
    }
    const teacher = await this.TeachersModel.findById(id);
    if (!teacher) {
      throw new NotFoundException('Restaurant not found');
    }
    return teacher;
  }
  //Update teacher by id  put
  async updateById(id: string, teacher: UpdateTeacherDto): Promise<Teachers> {
    return await this.TeachersModel.findByIdAndUpdate(id, teacher, {
      new: true,
      runValidators: true,
    });
  }

  //DElete teacher by id
  // async deleteById(id: string): Promise<Teachers> {
  //   return await this.TeachersModel.findByIdAndDelete(id);
  // }
  async deleteById(id: string): Promise<Boolean> {
    try {
      await this.TeachersModel.findByIdAndDelete(id);
      await this.TimetableModel.deleteMany({ subjectId: id });
      return true;
    } catch (error) {
      console.log(error);
    }
  }

  async getByClassId(subjectId: string): Promise<Teachers[]> {
    return this.TeachersModel.find({ subjectId }).populate('subjectId');
    // .populate('teacherId')
    // .populate('classId')
    // .exec();
  }
}
