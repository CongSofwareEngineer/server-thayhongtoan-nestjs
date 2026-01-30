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

  @Prop({ type: Types.ObjectId, ref: 'Class' })
  idClass?: Types.ObjectId

  @Prop({ type: Types.ObjectId, ref: 'Parent' })
  idParent: Types.ObjectId

  @Prop({ required: true, enum: StudentStatus, default: StudentStatus.ACTIVE })
  status: StudentStatus

}
export type StudentDocument = HydratedDocument<Student>;
export const StudentSchema = SchemaFactory.createForClass(Student)
