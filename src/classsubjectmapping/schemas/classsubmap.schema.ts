// import { Prop, Schema } from "@nestjs/mongoose";
// import mongoose, { Document } from "mongoose";
// @Schema()
// export class ClassSubject extends Document{
// @Prop()
// classID:number;

import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Classes } from 'src/classes/schemas/classes.schema';
import { Subjects } from 'src/subjects/schemas/subject.schema';
import mongoose, { Document } from 'mongoose';

@Schema()
export class ClassSubjectmapping extends Document {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Classes',
    // unique: [true, 'Id already Existed'],
  })
  classId: Classes; // Reference to Class document

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subjects',
    // unique: [true, 'Class already Existed'],
  })
  subjectId: Subjects; // Reference to Subject document
}

export const ClassSubjectSchema =
  SchemaFactory.createForClass(ClassSubjectmapping);
