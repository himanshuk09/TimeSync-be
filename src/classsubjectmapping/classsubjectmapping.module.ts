import { Module } from '@nestjs/common';
import { ClasssubjectmappingService } from './classsubjectmapping.service';
import { ClasssubjectmappingController } from './classsubjectmapping.controller';
import {
  ClassSubjectSchema,
  ClassSubjectmapping,
} from './schemas/classsubmap.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'ClassSubjectmapping',
        schema: ClassSubjectSchema,
      },
    ]),
  ],
  controllers: [ClasssubjectmappingController],
  providers: [ClasssubjectmappingService],
})
export class ClasssubjectmappingModule {}
