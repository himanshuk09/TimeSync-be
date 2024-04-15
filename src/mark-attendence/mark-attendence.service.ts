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
import { log } from 'console';

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

  // async findAttendanceByDateRange(
  //   classId: string,
  //   startDate: Date,
  //   endDate: Date,
  // ) {
  //   return this.AttendenceModel.find({
  //     classId: classId,
  //     attendanceDate: {
  //       $gte: startDate,
  //       $lte: endDate,
  //     },
  //   });
  // }
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

  //   async findAttendanceByDateRange(startDate: string, endDate: string) {

  // console.log("startDate",);

  //     // Parse the date strings to Date objects
  //     const startDateObj = new Date(startDate);
  //     const endDateObj = new Date(endDate);

  //     console.log('startDateObj', startDateObj, endDateObj);

  //     // Query MongoDB for attendance data between the specified dates
  //     return this.AttendenceModel.find({
  //       attendenceDate: {
  //         $gte: startDateObj,
  //         $lte: endDateObj,
  //       },
  //     });
  //   }

  // async findAttendanceByDateRange() {
  //   // const startDate = '2024-04-14T18:30:00.000Z'; // Add 'Z' to indicate UTC timezone
  //   // const endDate = '2024-04-21T18:30:00.000Z';

  //   console.log('startDate');

  //   // const startDateObj = new Date(startDate);
  //   // const endDateObj = new Date(endDate);

  //   // console.log('startDateObj', startDateObj, endDateObj);

  //   const Classes = await this.AttendenceModel.find({

  //       attendenceDate:{
  //         $gte: ISODate("2024-04-22T00:00:00.000Z"),
  //         $lte: ISODate("2024-04-26T23:59:59.999Z")
  //       }
  //     })

  //  ;

  //   return Classes;
  // }
}
