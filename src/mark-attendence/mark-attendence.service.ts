import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMarkAttendenceDto } from './dto/create-mark-attendence.dto';
import { UpdateMarkAttendenceDto } from './dto/update-mark-attendence.dto';
import { NoteAttendence } from './schemas/markattendence.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Injectable()
export class MarkAttendenceService {
  constructor(
    @InjectModel(NoteAttendence.name)
    private AttendenceModel: mongoose.Model<NoteAttendence>,
  ) {}

  async create(
    MarkAttendenceDto: CreateMarkAttendenceDto[],
  ): Promise<NoteAttendence[]> {
    const AttendenceEntities = [];
    for (const entity of MarkAttendenceDto) {
      const newEntity = await new this.AttendenceModel({
        subjectId: entity.subjectId,
        classId: entity.classId,
        studentId: entity.studentId,
        attendenceDate: entity.attendenceDate,
        attendenceType: entity.attendenceType,
        reason: entity.reason,
      });
      const saveEntity = await newEntity.save();
      AttendenceEntities.push(saveEntity);
    }
    return AttendenceEntities;
  }

  async getByClassIdSubjectIdAndDate(
    classId: string,
    subjectId: string,
    attendenceDate: Date,
  ): Promise<NoteAttendence[]> {
    const parsedDate = new Date(attendenceDate);

    return this.AttendenceModel.find({
      classId,
      subjectId,
      attendenceDate: parsedDate,
    })
      .populate('subjectId')
      .populate('studentId')
      .populate('classId')
      .exec();
  }

  async getByClassIdAndSubjectId(
    classId: string,
    subjectId: string,
  ): Promise<NoteAttendence[]> {
    return this.AttendenceModel.find({ classId, subjectId })
      .populate('subjectId')
      .populate('studentId')
      .populate('classId')
      .exec();
  }
  async getStudentsByClassId(classId: string): Promise<NoteAttendence[]> {
    return this.AttendenceModel.find({ classId })
      .populate('subjectId')
      .populate('studentId')
      .populate('classId')
      .exec();
  }
  async findById(id: string): Promise<NoteAttendence> {
    //For valid id
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException(
        'wrong mongoose ID error . Please enter correct ID',
      );
    }
    const classes = await this.AttendenceModel.findById(id);
    if (!classes) {
      throw new NotFoundException('Class not found');
    }
    return classes;
  }
  async findAll(): Promise<NoteAttendence[]> {
    const Classes = await this.AttendenceModel.find();
    return Classes;
  }
  async updateById(
    id: string,
    updateMarkAttendenceDto: UpdateMarkAttendenceDto,
  ): Promise<NoteAttendence> {
    return await this.AttendenceModel.findByIdAndUpdate(
      id,
      updateMarkAttendenceDto,
      {
        new: true,
        runValidators: true,
      },
    );
  }
}
