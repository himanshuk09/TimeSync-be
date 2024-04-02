import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { Students } from './schemas/students.schema';
import mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel(Students.name)
    private StudentsModel: mongoose.Model<Students>,
  ) {}

  // Create new students
  // async create(stud: CreateStudentDto): Promise<CreateStudentDto> {
  //   console.log(stud);
  //   const student = await this.StudentsModel.create(stud);
  //   console.log(student);
  //   return student;
  // }
  async create(createStudentDto: CreateStudentDto): Promise<Students> {
    const newStudent = new this.StudentsModel(createStudentDto);
    return newStudent.save();
  }
  //get All Students => GEt
  async findAll(): Promise<Students[]> {
    const students = await this.StudentsModel.find().populate('classId'); // Populate the 'classId' field with the corresponding Class document
    return students;
  }

  //Get Student by id : get
  async findById(id: string): Promise<Students> {
    //For valid id
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException(
        'wrong mongoose ID error . Please enter correct ID',
      );
    }
    const student = await this.StudentsModel.findById(id);
    if (!student) {
      throw new NotFoundException('Student not found');
    }
    return student;
  }

  //Update Students by id  put
  async updateById(id: string, student: UpdateStudentDto): Promise<Students> {
    return await this.StudentsModel.findByIdAndUpdate(id, student, {
      new: true,
      runValidators: true,
    });
  }

  //DElete students by id
  async deleteById(id: string): Promise<Students> {
    return await this.StudentsModel.findByIdAndDelete(id);
  }
}
