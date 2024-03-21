import { Injectable } from '@nestjs/common';
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
  getClassSubjectMap(classSubjectMappings) {
    // Create an empty map to store classes and their subjects
    const classSubjectMap = new Map();
    // Iterate over each classSubjectMapping object
    classSubjectMappings.forEach((mapping) => {
      const classId = mapping.classId._id;
      const className = mapping.classId.classname;
      const subjectName = mapping.subjectId.subject;
      // If the classId is not already in the map, add it with an empty array
      if (!classSubjectMap.has(classId)) {
        classSubjectMap.set(classId, { className, subjects: [] });
      }
      // Add the subject to the subjects array of the class
      classSubjectMap.get(classId).subjects.push(subjectName);
    });
    // Convert the map to an array of objects
    const classSubjectArray = Array.from(classSubjectMap.values());
    return classSubjectArray;
  }
  async findAll(): Promise<ClassSubjectmapping[]> {
    const classSubject = await this.ClassSubjectsMappingModel.find()
      .populate('classId') // Populate the 'classId' field with the corresponding Class document
      .populate('subjectId'); // Populate the 'subjectId' field with the corresponding Subject document
    const classSubjectArray = this.getClassSubjectMap(classSubject);
    return classSubjectArray;
  }
}

// {
//   "classId": "65f990d84823670a61600d1e",
//   "subjectIds": [
//     { "id": "65fa79e36215e4c861056d53" },
//     { "id": "65faa817712a5f11a8fe7e49" }
//   ]
// }
