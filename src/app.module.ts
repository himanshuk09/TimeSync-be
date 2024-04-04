import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

import { TeachersModule } from './teachers/teachers.module';
import { StudentsModule } from './students/students.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ClassesModule } from './classes/classes.module';
import { SubjectsModule } from './subjects/subjects.module';
import { ClasssubjectmappingModule } from './classsubjectmapping/classsubjectmapping.module';
import { EventsModule } from './events/events.module';
import { MarkAttendenceModule } from './mark-attendence/mark-attendence.module';
import { TimetableModule } from './timetable/timetable.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local', '.env.development'],
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URL),
    AuthModule,
    StudentsModule,
    TeachersModule,
    ClassesModule,
    SubjectsModule,
    ClasssubjectmappingModule,
    EventsModule,
    MarkAttendenceModule,
    TimetableModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
