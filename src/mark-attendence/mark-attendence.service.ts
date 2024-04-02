import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMarkAttendenceDto } from './dto/create-mark-attendence.dto';
import { UpdateMarkAttendenceDto } from './dto/update-mark-attendence.dto';
import { Attendence } from './schemas/markattendence.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Injectable()
export class MarkAttendenceService {
  constructor(
    @InjectModel(Attendence.name)
    private AttendenceModel: mongoose.Model<Attendence>,
  ) {}

  async create(
    createAttendence: CreateMarkAttendenceDto,
  ): Promise<Attendence[]> {
    const { classId, studentIds, attendencedate, attendencetype } =
      createAttendence;
    const createdMappings: Attendence[] = [];
    for (const studentIdObj of studentIds) {
      const { id: studentId } = studentIdObj;
      const newMapping = new this.AttendenceModel({
        classId,
        studentId,
        attendencedate,
        attendencetype,
      });
      const savedMapping = await newMapping.save();
      createdMappings.push(savedMapping);
    }

    return createdMappings;
  }

  getClassSubjectMap(classStudentMappings) {
    const classSubjectsMap = new Map();

    // Iterate over each mapping
    classStudentMappings.forEach((mapping) => {
      const classId = mapping.classId._id;
      const parentId = mapping._id;
      const className = mapping.classId.classname;
      const StudentName = mapping.studentId.name;
      // If classId is not in the map, initialize it with an empty array
      if (!classSubjectsMap.has(classId)) {
        classSubjectsMap.set(classId, { parentId, className, students: [] });
      }
      // Push the subject name to the subjects array for the corresponding classId
      classSubjectsMap.get(classId).subjects.push(StudentName);
    });

    // Convert map values to array and return
    return Array.from(classSubjectsMap.values());
  }
  async findAll(): Promise<Attendence[]> {
    const classSubject = await this.AttendenceModel.find()
      .populate('classId') // Populate the 'classId' field with the corresponding Class document
      .populate('studentId'); // Populate the 'subjectId' field with the corresponding Subject document
    const classSubjectArray = this.getClassSubjectMap(classSubject);
    return classSubjectArray;
  }

  async updateById(
    id: string,
    student: UpdateMarkAttendenceDto,
  ): Promise<Attendence> {
    return await this.AttendenceModel.findByIdAndUpdate(id, student, {
      new: true,
      runValidators: true,
    });
  }

  async findById(id: string): Promise<Attendence> {
    //For valid id
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException(
        'wrong mongoose ID error . Please enter correct ID',
      );
    }
    const student = await this.AttendenceModel.findById(id);
    if (!student) {
      throw new NotFoundException('Subject not found');
    }
    return student;
  }
  async deleteById(id: string): Promise<Attendence> {
    return await this.AttendenceModel.findByIdAndDelete(id);
  }
}
