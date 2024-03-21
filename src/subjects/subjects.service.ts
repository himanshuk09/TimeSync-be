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

@Injectable()
export class SubjectsService {
  constructor(
    @InjectModel(Subjects.name) private SubjectModel: Model<Subjects>,
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

  async deleteById(id: string): Promise<Subjects> {
    return await this.SubjectModel.findByIdAndDelete(id);
  }
}
