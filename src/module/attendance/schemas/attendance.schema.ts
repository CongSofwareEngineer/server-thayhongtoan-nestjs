import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Types } from 'mongoose'

export enum AttendanceStatus {
  ON = 'on',
  OFF = 'off',
}

@Schema({ versionKey: false })
export class Attendance {
  _id?: Types.ObjectId

  @Prop({ required: true })
  idStudent: string

  @Prop({ required: true })
  idClass: string

  @Prop({ required: true, enum: AttendanceStatus, default: AttendanceStatus.OFF })
  status: AttendanceStatus

  @Prop({ required: true })
  day: Date
}
export type AttendanceDocument = HydratedDocument<Attendance>;
export const AttendanceSchema = SchemaFactory.createForClass(Attendance)
