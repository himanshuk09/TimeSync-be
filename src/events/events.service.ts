import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Events } from './schemas/events.schema';
import mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Events.name)
    private EventssModel: mongoose.Model<Events>,
  ) {}
  async create(createEventDto: CreateEventDto): Promise<Events> {
    const newTeacher = new this.EventssModel(createEventDto);
    return newTeacher.save();
  }

  async findAll(): Promise<Events[]> {
    const events = await this.EventssModel.find();
    return events;
  }
  //Get Teachers by id : get
  async findById(id: string): Promise<Events> {
    //For valid id
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException(
        'wrong mongoose ID error . Please enter correct ID',
      );
    }
    const event = await this.EventssModel.findById(id);
    if (!event) {
      throw new NotFoundException('Restaurant not found');
    }
    return event;
  }
  //Update teacher by id  put
  async updateById(id: string, event: UpdateEventDto): Promise<Events> {
    return await this.EventssModel.findByIdAndUpdate(id, event, {
      new: true,
      runValidators: true,
    });
  }

  //DElete teacher by id
  async deleteById(id: string): Promise<Events> {
    return await this.EventssModel.findByIdAndDelete(id);
  }
}
