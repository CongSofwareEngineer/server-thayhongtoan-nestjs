import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Types } from 'mongoose'

export enum TeacherSex {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

@Schema({ versionKey: false })
export class Teacher {
  _id?: Types.ObjectId

  @Prop({ required: true })
  name: string

  @Prop({ required: true, unique: true })
  sdt: string

  @Prop({ required: true })
  password: string

  @Prop({ required: true, default: false })
  isAdmin: boolean

  @Prop({ required: true })
  age: number

  @Prop({ required: true, enum: TeacherSex })
  sex: TeacherSex

  @Prop()
  image?: string
}
export type TeacherDocument = HydratedDocument<Teacher>;
export const TeacherSchema = SchemaFactory.createForClass(Teacher)
