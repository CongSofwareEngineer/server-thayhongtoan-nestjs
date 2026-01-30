import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Types } from 'mongoose'

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

  @Prop({ required: true, default: true })
  sex: boolean // true: male, false: female

  @Prop()
  image?: string
}
export type TeacherDocument = HydratedDocument<Teacher>;
export const TeacherSchema = SchemaFactory.createForClass(Teacher)
