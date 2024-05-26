import { Injectable } from '@nestjs/common';
import { CreateTimetableDto } from './dto/create-timetable.dto';
import mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { NewTimetable } from './schemas/timetable.schema';

@Injectable()
export class TimetableService {
  constructor(
    @InjectModel(NewTimetable.name)
    private TimetableModel: mongoose.Model<NewTimetable>,
  ) {}

  // async create(
  //   createTimetableDto: CreateTimetableDto[],
  // ): Promise<NewTimetable[]> {
  //   console.log('createTimetableDto', createTimetableDto);
  //   const timetableEntites = [];
  //   for (const entity of createTimetableDto) {
  //     const newEntity = await new this.TimetableModel({
  //       subjectId: entity.subjectId,
  //       classId: entity.classId,
  //       teacherId: entity.teacherId,
  //       day: entity.day,
  //       period: entity.period,
  //     });
  //     console.log('newEntity', newEntity);

  //     const saveEntity = await newEntity.save();
  //     console.log('saveEntity', saveEntity);

  //     timetableEntites.push(saveEntity);
  //   }
  //   console.log('timetableEntites', timetableEntites);
  //   return timetableEntites;
  // }

  async create(
    createTimetableDto: CreateTimetableDto[],
  ): Promise<NewTimetable[]> {
    try {
      console.log('createTimetableDto', createTimetableDto);
      const timetableEntites = [];
      for (const entity of createTimetableDto) {
        const newEntity = await new this.TimetableModel({
          subjectId: entity.subjectId,
          classId: entity.classId,
          teacherId: entity.teacherId,
          day: entity.day,
          period: entity.period,
        });
        console.log('newEntity', newEntity);

        const saveEntity = await newEntity.save();
        console.log('saveEntity', saveEntity);

        timetableEntites.push(saveEntity);
      }
      console.log('timetableEntites', timetableEntites);
      return timetableEntites;
    } catch (error) {
      console.log(error);
    }
  }

  async getByClassId(classId: string): Promise<NewTimetable[]> {
    return this.TimetableModel.find({ classId })
      .populate('subjectId')
      .populate('teacherId')
      .populate('classId')
      .exec();
  }
  async findAll(): Promise<NewTimetable[]> {
    const timetable = await this.TimetableModel.find()
      .populate('subjectId')
      .populate('teacherId')
      .populate('classId');

    return timetable;
  }

  async deleteClass(classId: string) {
    try {
      return await this.TimetableModel.deleteMany({ classId: classId }).exec();
    } catch (error) {
      throw new Error('Failed to delete documents');
    }
  }

  getClassNames(documents: NewTimetable[]): any[] {
    const classMap = new Map<string, NewTimetable>();
    documents.forEach((doc) => {
      classMap.set(doc.classId.classname, doc);
    });
    return Array.from(classMap.values());
  }
}
