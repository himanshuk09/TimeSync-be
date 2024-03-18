import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Students } from './schemas/students.schema';
import mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel(Students.name)
    private StudentsModel: mongoose.Model<Students>,
  ) {}

  // Create new Restaurants
  // async create(stud: CreateStudentDto): Promise<CreateStudentDto> {
  //   console.log(stud);
  //   const student = await this.StudentsModel.create(stud);
  //   console.log(student);
  //   return student;
  // }
  async create(createStudentDto: CreateStudentDto): Promise<Students> {
    console.log(createStudentDto);
    const newStudent = new this.StudentsModel(createStudentDto);
    console.log(newStudent);
    return newStudent.save();
  }
  //get All Restaurants => GEt /restaurants
  async findAll(): Promise<Students[]> {
    const students = await this.StudentsModel.find();
    return students;
  }

  //Get reataurant by id : get
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
      throw new NotFoundException('Restaurant not found');
    }
    return student;
  }

  //Update restaurants by id  put
  async updateById(id: string, student): Promise<Students> {
    return await this.StudentsModel.findByIdAndUpdate(id, student, {
      new: true,
      runValidators: true,
    });
  }

  //DElete restaurant by id
  async deleteById(id: string): Promise<Students> {
    return await this.StudentsModel.findByIdAndDelete(id);
  }
}
