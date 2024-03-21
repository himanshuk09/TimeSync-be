import { Module } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { ClassesController } from './classes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TeachersSchema } from 'src/teachers/schemas/teachers.schema';
import { ClassesSchema } from './schemas/classes.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Classes',
        schema: ClassesSchema,
      },
    ]),
  ],
  controllers: [ClassesController],
  providers: [ClassesService],
})
export class ClassesModule {}
