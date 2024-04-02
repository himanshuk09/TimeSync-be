import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EventsSchema } from './schemas/events.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Events',
        schema: EventsSchema,
      },
    ]),
  ],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
