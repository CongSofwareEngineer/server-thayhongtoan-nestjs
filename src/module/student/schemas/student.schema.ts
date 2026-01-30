import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Types } from 'mongoose'

export enum StudentStatus {
  ACTIVE = 'active',
  STOP = 'stop',
}

@Schema({ versionKey: false })
export class Student {
  _id?: Types.ObjectId

  @Prop()
  image?: string

  @Prop({ required: true })
  name: string

  @Prop({ required: true })
  age: number

  @Prop({ required: true })
  idClass: string

  @Prop({ required: true, enum: StudentStatus, default: StudentStatus.ACTIVE })
  status: StudentStatus

  @Prop({ required: true })
  numberPhoneParent: string
}
export type StudentDocument = HydratedDocument<Student>;
export const StudentSchema = SchemaFactory.createForClass(Student)
