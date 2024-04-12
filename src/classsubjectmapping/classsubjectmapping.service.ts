import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateClasssubjectmappingDto } from './dto/create-classsubjectmapping.dto';
import { UpdateClasssubjectmappingDto } from './dto/update-classsubjectmapping.dto';
import { ClassSubjectmapping } from './schemas/classsubmap.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Injectable()
export class ClasssubjectmappingService {
  constructor(
    @InjectModel(ClassSubjectmapping.name)
    private ClassSubjectsMappingModel: mongoose.Model<ClassSubjectmapping>,
  ) {}

  // async create(
  //   createClassStudentsMappingDto: CreateClasssubjectmappingDto,
  // ): Promise<ClassSubjectmapping> {
  //   console.log(createClassStudentsMappingDto);
  //   const newStudent = new this.ClassSubjectsMappingModel(
  //     createClassStudentsMappingDto,
  //   );
  //   console.log(newStudent);
  //   return newStudent.save();
  // }

  async create(
    createClassStudentsMappingDto: CreateClasssubjectmappingDto,
  ): Promise<ClassSubjectmapping[]> {
    const { classId, subjectIds } = createClassStudentsMappingDto;

    const createdMappings: ClassSubjectmapping[] = [];

    for (const subjectIdObj of subjectIds) {
      const { id: subjectId } = subjectIdObj;
      const newMapping = new this.ClassSubjectsMappingModel({
        classId,
        subjectId,
      });
      const savedMapping = await newMapping.save();
      createdMappings.push(savedMapping);
    }

    return createdMappings;
  }

  // getClassSubjectMap(classSubjectMappings) {
  //   const classSubjectsMap = new Map();

  //   // Iterate over each mapping
  //   classSubjectMappings.forEach((mapping) => {
  //     const classId = mapping.classId._id;
  //     const parentId = mapping._id;
  //     const className = mapping.classId.classname;
  //     const subjectName = mapping.subjectId.subject;

  //     // If classId is not in the map, initialize it with an empty array
  //     if (!classSubjectsMap.has(classId)) {
  //       classSubjectsMap.set(classId, {
  //         classId,
  //         parentId,
  //         className,
  //         subjects: [],
  //       });
  //     }

  //     // Push the subject name to the subjects array for the corresponding classId
  //     classSubjectsMap.get(classId).subjects.push(subjectName);
  //   });

  //   // Convert map values to array and return
  //   return Array.from(classSubjectsMap.values());
  // }

  getClassSubjectMap(classSubjectMappings) {
    const classSubjectsMap = new Map();
    classSubjectMappings.forEach((mapping) => {
      const classId = mapping.classId._id;
      const parentId = mapping._id;
      const className = mapping.classId.classname;
      const subjectId = mapping.subjectId._id;
      const subjectName = mapping.subjectId.subject;
      if (!classSubjectsMap.has(classId)) {
        classSubjectsMap.set(classId, {
          classId,
          parentId,
          className,
          subjects: [],
        });
      }
      classSubjectsMap.get(classId).subjects.push({ subjectId, subjectName });
    });

    // Convert map values to array and return
    return Array.from(classSubjectsMap.values());
  }
  async findAll(): Promise<ClassSubjectmapping[]> {
    const classSubject = await this.ClassSubjectsMappingModel.find()
      .populate('classId') // Populate the 'classId' field with the corresponding Class document
      .populate('subjectId'); // Populate the 'subjectId' field with the corresponding Subject document
    const classSubjectArray = this.getClassSubjectMap(classSubject);
    return classSubjectArray;
  }

  async updateById(
    id: string,
    subject: UpdateClasssubjectmappingDto,
  ): Promise<ClassSubjectmapping> {
    return await this.ClassSubjectsMappingModel.findByIdAndUpdate(id, subject, {
      new: true,
      runValidators: true,
    });
  }

  async findById(id: string): Promise<ClassSubjectmapping> {
    //For valid id
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException(
        'wrong mongoose ID error . Please enter correct ID',
      );
    }
    const subject = await this.ClassSubjectsMappingModel.findById(id);
    if (!subject) {
      throw new NotFoundException('Subject not found');
    }
    return subject;
  }

  async deleteById(id: string): Promise<ClassSubjectmapping> {
    return await this.ClassSubjectsMappingModel.findByIdAndDelete(id);
  }
}
