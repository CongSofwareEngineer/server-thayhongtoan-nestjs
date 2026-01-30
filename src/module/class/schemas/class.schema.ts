import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Types } from 'mongoose'

@Schema({ versionKey: false })
export class Class {
  _id?: Types.ObjectId

  @Prop({ required: true })
  name: string

  @Prop({ required: true })
  price: number

  @Prop()
  startTime?: Date

  @Prop()
  endTime?: Date

  @Prop({ required: true })
  numberStudent: number

  @Prop()
  note?: string


  @Prop({ type: Object })
  attributes?: Record<string, any>
}
export type ClassDocument = HydratedDocument<Class>;
export const ClassSchema = SchemaFactory.createForClass(Class)

ClassSchema.virtual('students', {
  ref: 'Student',
  localField: '_id',
  foreignField: 'idClass',
})
