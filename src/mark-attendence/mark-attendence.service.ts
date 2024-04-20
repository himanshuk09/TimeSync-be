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

import { DateRangeDto } from './dto/date-range-dto';

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
      //For valid id
      const isValidId = mongoose.isValidObjectId(entity.subjectId);
      if (!isValidId) {
        throw new BadRequestException(
          'wrong mongoose ID error . Please enter correct ID',
        );
      }
      const parsedDate = new Date(entity.attendenceDate);
      const newEntity = await new this.AttendenceModel({
        subjectId: entity.subjectId,
        classId: entity.classId,
        studentId: entity.studentId,
        attendenceDate: parsedDate,
        attendenceType: entity.attendenceType,
        reason: entity.reason,
      });
      const saveEntity = await newEntity.save();
      AttendenceEntities.push(saveEntity);
    }
    return AttendenceEntities;
  }
  async getByClassIdSubjectIdByStudentIdAndDate(
    classId: string,
    subjectId: string,
    studentId: string,
    attendenceDate: Date,
  ): Promise<NoteAttendence[]> {
    const parsedDate = new Date(attendenceDate);
    return this.AttendenceModel.find({
      classId,
      subjectId,
      studentId,
      attendenceDate: parsedDate,
    })
      .populate('subjectId')
      .populate('studentId')
      .populate('studentId')
      .populate('classId')
      .exec();
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
    const attendence = await this.AttendenceModel.find()
      .populate('subjectId')
      .populate('studentId')
      .populate('studentId')
      .populate('classId')
      .exec();
    return attendence;
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

  // async findBetweenDateRange(dateRange: DateRangeDto) {
  //   try {
  //     const startDate = new Date(dateRange.startDate);
  //     const endDate = new Date(dateRange.endDate);

  //     console.log('Start Date:', startDate);
  //     console.log('End Date:', endDate);

  //     const attendance = await this.AttendenceModel.find({
  //       attendenceDate: {
  //         $gte: startDate,
  //         $lte: endDate,
  //       },
  //     });

  //     return attendance;
  //   } catch (error) {
  //     console.error('Error finding attendance:', error);
  //     throw error;
  //   }
  // }
}
