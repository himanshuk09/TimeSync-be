import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
  Put,
  NotFoundException,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Events } from './schemas/events.schema';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}
  @Get()
  async getAllEvents(): Promise<Events[]> {
    return this.eventsService.findAll();
  }
  @Post()
  async createEvents(
    @Res() response,
    @Body() teacher: CreateEventDto,
  ): Promise<Events> {
    try {
      const newTeacher = await this.eventsService.create(teacher);
      return response.status(HttpStatus.CREATED).json({
        message: 'Events has been created successfully',
        newTeacher,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: teacher not created!',
        error: 'Bad Request',
      });
    }
  }
  @Get(':id')
  async getEvents(@Param('id') id: string): Promise<Events> {
    return this.eventsService.findById(id);
  }

  @Put(':id')
  async UpdateEvent(
    @Param('id') id: string,
    @Body() events: UpdateEventDto,
  ): Promise<Events> {
    await this.eventsService.findById(id);
    return this.eventsService.updateById(id, events);
  }
  @Delete(':id')
  async deleteEvent(@Param('id') id: string): Promise<{ deleted: boolean }> {
    await this.eventsService.findById(id);
    const deletedEvent = await this.eventsService.deleteById(id);
    if (deletedEvent) {
      return { deleted: true };
    } else {
      throw new NotFoundException('Event not found');
    }
  }
}
