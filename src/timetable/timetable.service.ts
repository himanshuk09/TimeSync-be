import { Injectable } from '@nestjs/common';
import { CreateTimetableDto } from './dto/create-timetable.dto';
import { UpdateTimetableDto } from './dto/update-timetable.dto';
import { Timetable } from './entities/timetable.entity';
import mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TimetableService {
  constructor(
    @InjectModel(Timetable.name)
    private TimetableModel: mongoose.Model<Timetable>,
  ) {}

  async create(createTimetableDto: CreateTimetableDto): Promise<Timetable[]> {
    const { classId, subjectIds, teacherIds, day, period } = createTimetableDto;

    const createdMappings: Timetable[] = [];

    for (const subjectIdObj of subjectIds) {
      const { id: subjectId } = subjectIdObj;
      const newMapping = new this.TimetableModel({
        classId,
        subjectId,
      });
      const savedMapping = await newMapping.save();
      createdMappings.push(savedMapping);
    }

    return createdMappings;
  }
}
