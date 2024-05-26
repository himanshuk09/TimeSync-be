import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { Subjects } from './schemas/subject.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { ClassSubjectmapping } from 'src/classsubjectmapping/schemas/classsubmap.schema';
import { Teachers } from 'src/teachers/schemas/teachers.schema';
import { NewTimetable } from 'src/timetable/schemas/timetable.schema';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectModel(Subjects.name) private SubjectModel: Model<Subjects>,
    @InjectModel(ClassSubjectmapping.name)
    private readonly ClassSubjectsMappingModel: Model<ClassSubjectmapping>,
    @InjectModel(Teachers.name)
    private TeachersModel: mongoose.Model<Teachers>,
    @InjectModel(NewTimetable.name)
    private TimetableModel: mongoose.Model<NewTimetable>,
  ) {}

  async create(createSubjectDto: CreateSubjectDto): Promise<Subjects> {
    const newSubject = new this.SubjectModel(createSubjectDto);
    return newSubject.save();
  }

  async findAll(): Promise<Subjects[]> {
    const subjects = await this.SubjectModel.find();
    return subjects;
  }

  async findById(id: string): Promise<Subjects> {
    //For valid id
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException(
        'wrong mongoose ID error . Please enter correct ID',
      );
    }
    const subject = await this.SubjectModel.findById(id);
    if (!subject) {
      throw new NotFoundException('Subject not found');
    }
    return subject;
  }

  async updateById(id: string, subject: UpdateSubjectDto): Promise<Subjects> {
    return await this.SubjectModel.findByIdAndUpdate(id, subject, {
      new: true,
      runValidators: true,
    });
  }

  // async deleteById(id: string): Promise<Subjects> {
  //   return await this.SubjectModel.findByIdAndDelete(id);
  // }
  async deleteById(id: string): Promise<Boolean> {
    try {
      await this.SubjectModel.findByIdAndDelete(id);
      await this.ClassSubjectsMappingModel.deleteMany({ subjectId: id });
      await this.TeachersModel.deleteMany({ subjectId: id });
      await this.TimetableModel.deleteMany({ subjectId: id });
      return true;
    } catch (error) {
      console.log(error);
    }
  }
}
